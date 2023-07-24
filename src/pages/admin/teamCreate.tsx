import  { useState } from 'react'
import Swal from 'sweetalert2'
import { useCreateTeamMutation } from '../../redux/features/adminApi';

export default function TeamCreate() {
  const [createTeam, { }] = useCreateTeamMutation();
    const [teamObj, setTeamObj] = useState({})
    const [errors, setErrors] = useState({
        apiError: ''
      })
    const teamCreateHandler = async () => {
        const teamData: any = await createTeam(teamObj)
        console.log('teamData ===>', teamData)
        if(teamData?.data?.status == 200){
          Swal.fire(
            'Good job!',
            'New Team is created!',
            'success'
          )
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
            setErrors({...errors, apiError: ''})
          }} className="input_field mt-2" placeholder="Enter Name"/>
        </div>
        <p className='text-red-500'>{errors?.apiError}</p>
        <div className="input_div mt-4">
          <label className="label_text">Team Category</label>
          <input type="text"  onChange={(e) => {
            setTeamObj({...teamObj, category: e.target.value})
          }} className="input_field mt-2"  placeholder="Write Category"/>
        </div>
        <button  onClick={() => teamCreateHandler()} className="login_btn">Create</button>
    </div>
</div>
  )
}
