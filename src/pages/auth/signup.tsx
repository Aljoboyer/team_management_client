import  { useState } from 'react'
import { useSignUpMutation } from '../../redux/features/authApi';
import { useLocation, useNavigate } from 'react-router-dom';
import AppIcon from '../../assets/app_icon.png'

export default function Signup() {
  let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [signUp, { isLoading, isError, isSuccess }] = useSignUpMutation();
    console.log( isLoading, isError, isSuccess)
    const [userObj, setUserObj] : any= useState({});
    const location = useLocation();
    const [loader, setLoader] = useState(false)

    const navigate = useNavigate();
    const [errors, setErrors] = useState({
      apiError: '',
      emailErr: '',
      passwordErr: '',
      nameErr: ''
    })

    const signUpHandler = async () => {
      const postUserObj = {...userObj, role: location?.state, profileImg: ''}
      if (emailRegex.test(userObj?.email) === false || !userObj?.email) {
        setErrors({...errors, emailErr: 'Please Enter a valid email'})
        return
      }
      if (!userObj?.name) {
        setErrors({...errors, nameErr: 'Please Enter your name'})
        return
      }
      if (!userObj?.password) {
        setErrors({...errors, passwordErr: 'Please Enter password'})
        return
      }
      setLoader(true)
      const data: any = await signUp(postUserObj)
      console.log('this is data', data?.data)
      if(data?.data?.result?.email){
        localStorage.setItem('token', JSON.stringify(data?.data?.token))
       setTimeout(() => {
        setLoader(false)
        navigate('/teamsDashboard')
       },1000)
      }
      else{
        setLoader(false)
        setErrors({...errors, apiError: data?.error?.data?.message})
      }
    }
   
  return (
    <div className="login_container">
    <div className='welcome_div'>
      <img  className='header_img' src={AppIcon} />
      <h4 className="login_title">Create Account</h4>
    </div>
    <div className="form_div">
         <div className="input_div">
          {/* <label className="label_text">Email</label> */}
          <input type="text" onChange={(e) => {
                setUserObj({...userObj, name: e.target.value})
                setErrors({...errors, nameErr: ''})
          }} className="input_field" placeholder="Enter Name"/>
            <p className='text-red-500 mt-4'>{errors?.nameErr}</p>
        </div>
        <div className="input_div mt-4">
          {/* <label className="label_text">Email</label> */}
          <input type="email" onChange={(e) => {
            setUserObj({...userObj, email: e.target.value})
            setErrors({...errors, emailErr: ''})
          }} className="input_field" placeholder="Enter Email"/>
            <p className='text-red-500 mt-4'>{errors?.emailErr}</p>
        </div>
        <div className="input_div mt-4">
          {/* <label className="label_text">Password</label> */}
          <input type="password"  onChange={(e) => {
            setUserObj({...userObj, password: e.target.value})
            setErrors({...errors, passwordErr: ''})
          }} className="input_field"  placeholder="Enter Password"/>
            <p className='text-red-500 mt-4'>{errors?.passwordErr}</p>
        </div>
        <p className='text-red-500 mt-4'>{errors?.apiError}</p>
              <p className='text-gray-600 mt-4'>Already have an account? <span onClick={() => navigate('/login', {state: location?.state})} className='text-gray-300 hover:text-blue-500 cursor-pointer'>Login</span></p>
              {
                loader ?  <button className="login_btn">Loading...</button> :  <button  onClick={() => signUpHandler()} className="login_btn">Sign Up</button>
              }
             
        
    </div>
</div>
  )
}
