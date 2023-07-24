import { useNavigate } from "react-router-dom"


export default function TeamDetailsDashboard() {
    const navigate = useNavigate()
  return (
    <div className="team_details_container">
        <div className="team_details_header">
            <div>
                <p className="team_details_header_text">Team</p>
                <h4 className="team_details_header_title">Little programmers</h4>
            </div>
            <div className="header_btn_div">
                <button onClick={() => navigate('/teamCreate')} className="assign_btn">Assign a group</button>
                <button className="add_btn">Add a members</button>
            </div>
        </div>
        <div className="status_btn_div">
            <button className="active_btn">Active members</button>
            <button className="pending_btn">Pending</button>
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
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">
                    Silver
                </td>
                <td className="px-6 py-4">
                    Laptop
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
            </tr>
        </tbody>
    </table>
</div>

    </div>
  )
}
