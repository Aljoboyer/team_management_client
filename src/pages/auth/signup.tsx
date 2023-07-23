import  { useState } from 'react'
import { useSignUpMutation } from '../../redux/features/authApi';
import { useNavigate } from 'react-router-dom';
import AppIcon from '../../assets/app_icon.png'

export default function Signup() {
    const [signUp, { isLoading, isError, isSuccess }] = useSignUpMutation();
    console.log( isLoading, isError, isSuccess)
    const [userObj, setUserObj] = useState({})
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
      apiError: ''
    })

    const signUpHandler = async () => {
     console.log('clicked')
      const data: any = await signUp(userObj)
      console.log('this is data', data?.data)
      if(data?.data?.result?.email){
        localStorage.setItem('token', JSON.stringify(data?.data?.token))
       setTimeout(() => {
        navigate('/')
       },1000)
      }
      else{
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
                setUserObj({...userObj, userName: e.target.value})
          }} className="input_field" placeholder="Enter Name"/>
        </div>
        <div className="input_div mt-4">
          {/* <label className="label_text">Email</label> */}
          <input type="email" onChange={(e) => {
            setUserObj({...userObj, email: e.target.value})
          }} className="input_field" placeholder="Enter Email"/>
        </div>
        <div className="input_div mt-4">
          {/* <label className="label_text">Password</label> */}
          <input type="password"  onChange={(e) => {
            setUserObj({...userObj, password: e.target.value})
          }} className="input_field"  placeholder="Enter Password"/>
        </div>
        <p className='text-red-500 mt-4'>{errors?.apiError}</p>
              <p className='text-gray-600 mt-4'>Already have an account? <span onClick={() => navigate('/login')} className='text-gray-300 hover:text-blue-500 cursor-pointer'>Login</span></p>
        <button  onClick={() => signUpHandler()} className="login_btn">Sign Up</button>
    </div>
</div>
  )
}
