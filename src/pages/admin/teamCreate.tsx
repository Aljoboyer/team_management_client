import  { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useCreateTeamMutation } from '../../redux/features/adminApi';
import { useGetUserQuery } from '../../redux/features/authApi';
import { useNavigate } from 'react-router-dom';

export default function TeamCreate() {
  const navigate = useNavigate()
  const [createTeam, { }] = useCreateTeamMutation();
    const [teamObj, setTeamObj] = useState({
      teamName: '',
      category: ''
    })
    const [errors, setErrors] = useState({ apiError: '', teamNameErr: '', categoryErr: ''})
    const jsonData: any = localStorage.getItem('token')
    const token = jsonData ?  JSON.parse(jsonData) : 'jsdflkashhdlfkj'
    const { data } = useGetUserQuery(token, {
      refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
      const isToken = localStorage.getItem('token')
      if(!isToken){
        navigate('/')
        return
      }
    },[])

    const teamCreateHandler = async () => {
      if(!teamObj?.teamName){
        setErrors({...errors, teamNameErr: 'Please write team name'})
        return
      }
      if(!teamObj?.category){
        setErrors({...errors, categoryErr: 'Please write team category'})
        return
      }
      const postObj = {...teamObj, createdBy: data?._id || data?.id}
  
        const teamData: any = await createTeam(postObj)
        console.log('teamData ===>', postObj)
        if(teamData?.data?.status == 200){
          Swal.fire(
            'Good job!',
            'New Team is created!',
            'success'
          )
          navigate('/teamsDashboard')
        }
        else{
          setErrors({...errors, apiError: teamData?.error?.data?.message})
          Swal.fire(
            'Failed!',
            'Team Creation Failed!',
            'error'
          )
        }
    }
  return (
    <div className="login_container create_team_container my-12 mx-auto">
    <div className='welcome_div'>
      <h4 className="login_title">Create a new team</h4>
    </div>
    <div className="form_div">
        <div className="input_div">
          <label className="label_text">Team Name</label>
          <input type="email" onChange={(e) => {
            setTeamObj({...teamObj, teamName: e.target.value})
            setErrors({...errors, apiError: '', teamNameErr: ''})
          }} className="input_field mt-2" placeholder="Enter Name"/>
           <p className='text-red-500'>{errors?.teamNameErr}</p>
        </div>
        <p className='text-red-500'>{errors?.apiError}</p>
        <div className="input_div mt-4">
          <label className="label_text">Team Category</label>
          <input type="text"  onChange={(e) => {
            setTeamObj({...teamObj, category: e.target.value})
            setErrors({...errors, categoryErr: ''})
          }} className="input_field mt-2"  placeholder="Write Category"/>
           <p className='text-red-500'>{errors?.categoryErr}</p>
        </div>
        <button  onClick={() => teamCreateHandler()} className="login_btn">Create</button>
    </div>
</div>
  )
}
