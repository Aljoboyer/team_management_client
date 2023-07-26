import  { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../redux/features/authApi';
import AppIcon from '../../assets/app_icon.png';

export default function Login() {
  let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [login, { isLoading, isError, isSuccess }] = useLoginMutation();
    console.log( isLoading, isError, isSuccess)
    const [userObj, setUserObj] : any= useState({})
    const navigate = useNavigate();

    const [errors, setErrors] = useState({
      apiError: '',
      emailErr: '',
      passwordErr: ''
    });

    const [loader, setLoader] = useState(false)

    const loginHandler = async () => {
      if (emailRegex.test(userObj?.email) === false || !userObj?.email) {
        setErrors({...errors, emailErr: 'Please Enter a valid email'})
        return
      }
      if (!userObj?.password) {
        setErrors({...errors, passwordErr: 'Please Enter password'})
        return
      }

      setLoader(true)
      const data: any = await login(userObj)
      console.log(data)
      if(data?.data?.result?.email){
        localStorage.setItem('token', JSON.stringify(data?.data?.token))
       setTimeout(() => {
        setLoader(false)
        navigate('/teamsDashboard')
       },2000)
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
            <h4 className="login_title">Welcome to Back!</h4>
          </div>
          <div className="form_div">
              <div className="input_div">
                {/* <label className="label_text">Email</label> */}
                <input type="email" onChange={(e) => {
                  setUserObj({...userObj, email: e.target.value})
                  setErrors({...errors, emailErr: ''})
                }} className="input_field" placeholder="Enter Email"/>
                 <p className='text-red-500'>{errors?.emailErr}</p>
              </div>
              <div className="input_div mt-4">
                {/* <label className="label_text">Password</label> */}
                <input type="password"  onChange={(e) => {
                  setUserObj({...userObj, password: e.target.value})
                  setErrors({...errors, passwordErr: ''})
                }} className="input_field"  placeholder="Enter Password"/>
                 <p className='text-red-500'>{errors?.passwordErr}</p>
              </div>
              <p className='text-red-500'>{errors?.apiError}</p>
              <p className='text-gray-600 mt-4'>Don’t have an account? <span onClick={() => navigate('/signup')} className='text-gray-300 hover:text-blue-500 cursor-pointer'>Sign up</span></p>
              {
                loader ?  <button className="login_btn">Loading...</button> :  <button  onClick={() => loginHandler()} className="login_btn">Continue</button>
              }
             
          </div>
    </div>
  )
}
