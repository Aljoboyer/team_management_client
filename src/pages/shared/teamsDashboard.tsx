import { useNavigate } from "react-router-dom"
import TeamBlack from '../../assets/teamBlack.png'
import { useGetAllTeamsQuery } from "../../redux/features/adminApi";
import { useGetUserQuery } from "../../redux/features/authApi";
import moment from "moment";

export default function TeamsDashboard() {
    const jsonData: any = localStorage.getItem('token')
    const token =  JSON.parse(jsonData)

    const { data } = useGetAllTeamsQuery(token, {
        refetchOnMountOrArgChange: true,
      });
      const { data: userData } = useGetUserQuery(token, {
        refetchOnMountOrArgChange: true,
      });
    const navigate = useNavigate();
 console.log('userData', userData)
 console.log('team', data)
    
    const expireHourCalculation = (time1: any, time2: any) => {
        const startTime = moment(time1, 'HH:mm');
        const endTime = moment(time2, 'HH:mm');

        const duration = moment.duration(endTime.diff(startTime));

       
        const totalHours = Math.floor(duration.asHours());
        const totalMinutes = duration.minutes();

        return `${totalHours}hr : ${totalMinutes}min`
      }

  return (
    <div className="team_details_container">
    <div className="team_details_header">
        <div>
            <p className="team_details_header_text">{userData?.role == 'admin' ? 'Admin Dashboard' : userData?.role == 'user' ? `Hi ${userData?.name} !` : ''}</p>
            <h4 className="team_details_header_title">{userData?.role == 'admin' ? 'Team Creation management system' :  userData?.role == 'user' ?  'Your Team Invitation List' : ''}</h4>
        </div>

    </div>
    
    {
        userData?.role == 'admin' &&    <div className="status_btn_div">
        <button onClick={() => navigate('/teamCreate')} className="active_btn">+  Create a team   </button>
    </div>
    }
    
    <div className="relative overflow-x-auto teams_div">
       {userData?.role == 'admin' &&  <h4 className="exists_text my-4">Existing Team</h4>}
        
        {
            data?.map((item: any) => (
                <div onClick={() => {
                    if(userData?.role == 'admin'){
                        navigate(`/teamDetailsDashboard/${item?._id}`)
                    }else{
                        navigate(`/teamDetailsDashboard/${item?.teamDetails?._id}`)
                    }
                }} className="teams_card mt-4">
                <div className="img_info_div">
                    <img src={TeamBlack} />
                    <div className="mx-2">
                        <h4 className="team_name">{item?.teamName || item?.teamDetails?.teamName}</h4>
                        <p className="user_name2">By <span  className="user_name">{item?.createdBy?.name || item?.teamDetails?.createdBy?.name}</span></p>
                    </div>
                    <div className="empty_div mr-2"></div>
                    <h5 className="role_text">{item?.category || item?.teamDetails?.category}</h5>
                </div>
                
                {
                    userData?.role == 'user' &&    
               <div className="flex flex-row justify-cneter items-center">
                    <p className="  mr-4">Ends in {expireHourCalculation(item?.expireFromTime, item?.expireToTime)}</p>
                 <div className="action_btn_div">
                    <button className="reject">Reject</button>
                    <button className="accept">Accept</button>
                </div>
                </div>
                }

            </div>
            ))
        }

    </div>

</div>
  )
}
