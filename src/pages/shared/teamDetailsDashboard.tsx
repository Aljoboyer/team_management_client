import {useEffect, useState} from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { useGetIndividualTeamQuery } from "../../redux/features/userApi";
import { useGetUserQuery } from '../../redux/features/authApi';


export default function TeamDetailsDashboard() {
    const navigate = useNavigate();
    const params = useParams(); 
    const { data } = useGetIndividualTeamQuery(params.id, {
        refetchOnMountOrArgChange: true,});
    const [pendingData , setPendingData] = useState([])
    const [activeData , setActiveData] = useState([])
    const [showData, setShowData] = useState([]);
    const jsonData: any = localStorage.getItem('token')
    const token =  JSON.parse(jsonData);

    const { data: userData } = useGetUserQuery(token, {
        refetchOnMountOrArgChange: true,
      });

    useEffect(() => {
        if(data?.length > 0){
            const filterData = data?.filter((item: any) => item?.status == 'Active')
            const filterData2 = data?.filter((item: any) => item?.status == 'Pending')
            setPendingData(filterData2)
            setActiveData(filterData)
            setShowData(filterData)
        }
    }, [data?.length, data])


    const tabHandler = (tabVal: string) => {
        const filterData = data?.filter((item: any) => item?.status == tabVal)
        setShowData(filterData)
    } 

  return (
    <div className="team_details_container">
        <div className="team_details_header">
            <div>
                <p className="team_details_header_text">Team</p>
                <h4 className="team_details_header_title">{data &&  data[0]?.teamDetails?.teamName}</h4>
            </div>
            {
                userData?.role == 'admin' && <div className="header_btn_div">
                <button  className="assign_btn">Assign a group</button>
                <button onClick={() => navigate(`/addMember/${params?.id}`)} className="add_btn">Add a members</button>
            </div>
            }

        </div>

        <div className="status_btn_div">
            <button onClick={() => tabHandler('Active')} className="active_btn">Active members {`(${activeData?.length})`}</button>
            <button onClick={() => tabHandler('Pending')} className="pending_btn">Pending {`(${pendingData?.length})`}</button>
        </div>
        
        <div className="relative overflow-x-auto details_table">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 font-bold">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3 font-bold">
                            Email ID
                        </th>
                        <th scope="col" className="px-6 py-3 font-bold">
                            Role
                        </th>
                        <th scope="col" className="px-6 py-3 font-bold">
                            User Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                   {
                    showData?.map((item: any) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           {item?.name}
                        </th>
                        <td className="px-6 py-4">
                         {item?.email}
                        </td>
                        <td className="px-6 py-4">
                        {item?.teamRole}
                        </td>
                        <td className="px-6 py-4">
                        {item?.status}
                        </td>
                    </tr>
                    ))
                   }
                </tbody>
            </table>
        </div>

    </div>
  )
}
