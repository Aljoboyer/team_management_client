import { useNavigate } from "react-router-dom"
import TeamBlack from '../../assets/teamBlack.png'
import { useGetAllTeamsQuery } from "../../redux/features/adminApi";
import { useGetUserQuery } from "../../redux/features/authApi";
import moment from "moment";
import { useStatusChangeMutation } from "../../redux/features/userApi";
import { useEffect, useState } from "react";
import Modals from "../../components/modals";

export default function TeamsDashboard() {
    const jsonData: any = localStorage.getItem('token')
    const token =  JSON.parse(jsonData)
    const [statusChange, {  }] = useStatusChangeMutation();
    const [modalShow, setModalShow] = useState(false)
    const [invitationData, setInvitationData] = useState({});

    const { data } = useGetAllTeamsQuery(token, {
        refetchOnMountOrArgChange: true,
      });
    const { data: userData } = useGetUserQuery(token, {
    refetchOnMountOrArgChange: true,
    });
    const navigate = useNavigate();

    
    const expireHourCalculation = (time1: any, time2: any) => {
        const startTime = moment(time1, 'HH:mm');
        const endTime = moment(time2, 'HH:mm');

        const duration = moment.duration(startTime.diff(endTime));

       
        const totalHours = Math.floor(duration.asHours());
        const totalMinutes = duration.minutes();

        return `${totalHours}hr : ${totalMinutes}min`
      }
    
    const statusChangeHandler = async (item: any, status: string) => {
        const updateData = {id: item?._id, status: status}
        const statusChangeData = await statusChange(updateData)
        console.log('status change data', statusChangeData)
        setModalShow(false)
    }

    const ModalHandler = () => {
        // e.preventDefault();
        setModalShow(!modalShow)
      };
    
    useEffect(() => {
        if(userData?.role == 'user' && data && data?.length > 0){
            const filterData = data?.filter((item: any) => item?.status == 'Pending')
            const sortData = filterData?.sort((a: any, b: any) =>{
                return  a.updatedAt > b.updatedAt ? -1 : 1
            })
            console.log('sortData', sortData)
            if(sortData[0]?.status){
                setInvitationData(sortData[0])
                setModalShow(!modalShow)
            }
        }
    }, [userData, userData?.role, data?.length]);
    
    useEffect(() => {
        const isToken = localStorage.getItem('token')
        if(!isToken){
          navigate('/')
          return
        }
      },[])

  return (
    <div className="team_details_container">
    <div className="team_details_header">
        <div>
            <p className="team_details_header_text">{userData?.role == 'admin' ? 'Admin Dashboard' : userData?.role == 'user' ? `Hi ${userData?.name} !` : ''}</p>
            <h4 className="team_details_header_title">{userData?.role == 'admin' ? 'Team Creation management system' :  userData?.role == 'user' ?  'Your Team List' : ''}</h4>
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
                    userData?.role == 'user' && item?.status == 'Pending' &&    
               <div className="flex flex-row justify-cneter items-center">
                    <p className="  mr-4">Ends in {expireHourCalculation(item?.expireFromTime, item?.expireToTime)}</p>
                 <div className="action_btn_div">
                    <button  onClick={(e) => {
                          e.stopPropagation();
                        statusChangeHandler(item, 'Reject')
                    }} className="reject">Reject</button>
                    <button onClick={(e) => {
                        e.stopPropagation();
                        statusChangeHandler(item, 'Active')
                        }} className="accept">Accept</button>
                </div>
                </div>
                }

            </div>
            ))
        }

    </div>

        {
            modalShow && <Modals statusChangeHandler={statusChangeHandler} invitationData={invitationData} modalShow={modalShow} ModalHandler={ModalHandler} />
        }
</div>
  )
}
