import { useNavigate } from "react-router-dom"
import TeamBlack from '../../assets/teamBlack.png'

export default function TeamsDashboard() {
    const navigate = useNavigate()
  return (
    <div className="team_details_container">
    <div className="team_details_header">
        <div>
            <p className="team_details_header_text">Admin Dashboard</p>
            <h4 className="team_details_header_title">Team Creation management system</h4>
        </div>

    </div>
    <div className="status_btn_div">
        <button className="active_btn">+  Create a team   </button>
    </div>
    
    <div className="relative overflow-x-auto teams_div">
        <h4 className="exists_text my-4">Existing Team</h4>
        <div className="teams_card">
            <div className="img_info_div">
                <img src={TeamBlack} />
                <div className="mx-2">
                    <h4 className="team_name">Tech Titans</h4>
                    <p className="user_name2">By <span  className="user_name">Hasan Reza</span></p>
                </div>
                <div className="empty_div mr-2"></div>
                <h5 className="role_text">UX & UI Designer Role</h5>
            </div>

            <div className="action_btn_div">
                <button className="reject">Reject</button>
                <button className="accept">Accept</button>
            </div>
        </div>
    </div>

</div>
  )
}
