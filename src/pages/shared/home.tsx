import React from 'react'
import AppIcon from '../../assets/app_icon.png';
import { useNavigate } from 'react-router-dom';
import { useGetUserQuery } from '../../redux/features/authApi';

export default function Home() {
  const navigate = useNavigate();
  const jsonData: any = localStorage.getItem('token')
  const token = jsonData ?  JSON.parse(jsonData) : 'jsdflkashhdlfkj'

  const { data } = useGetUserQuery(token, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <div className='home_header'>
        <div className='header_img_div'>
            <img  className='header_img' src={AppIcon} />
        </div>
        <div className='header_heading mt-7'>
            <h4 className='header_title'>Welcome to Team Management</h4>
            <p>Lets Work Together</p>
            {
              data?.email ?  <div className='button_div'> 
              <button onClick={() => navigate('/')} className='login_btn'>Continue</button>
          </div> : <div className='button_div'> 
              <button onClick={() => navigate('/login')} className='auth_btn'>Login</button>
              <button onClick={() => navigate('/signup')}  className='auth_btn'>Sign Up</button>
          </div> 
            }

        </div>
    </div>
  )
}
