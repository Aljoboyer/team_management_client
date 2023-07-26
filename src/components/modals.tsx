
export default function Modals({ModalHandler, modalShow, invitationData, statusChangeHandler}: any): any {
  return (
    <div
    id="AccessModal"
    className="fixed inset-0 bg-black bg-opacity-5 backdrop-blur-sm flex items-center justify-center text-left w-full h-full outline-none overflow-auto z-10"
  >
    <div
      // onSubmit={handleSubmit(onSubmit)}
      className="bg-white  py-4 rounded-lg xs:mx-3 my-6  w-1/2 h-96"
    >
      <div className="mt-0 p-3 border-b border-[#D9D9D9] flex flex-row items-center justify-between">
        <p className="text-2xl font-semibold">Team Invitation</p>
        <p className="text-xl font-bold cursor-pointer" onClick={ModalHandler}>X</p>
      </div>

      <div className="invitation_modal_view mx-12 py-4 rounded mt-4">
      <div className="mt-4 p-3 ">
        <p className=" text-center text-xl">You have received a team invitation from the  <span className="font-bold">{invitationData?.teamDetails?.teamName} Team</span></p>
        <p className="font text-center">Join the {invitationData?.teamDetails?.teamName} Team as a new team member</p>
      </div>

        <div className="flex flex-row justify-center items-center">
            <div className="avater_btn">
                <p className="font-bold text-xl">L</p>
            </div>
            <div className="ms-4">
                <h3>{invitationData?.teamDetails?.teamName}</h3>
                <p>{invitationData?.teamDetails?.createdBy?.email}</p>
            </div>
        </div>

      <div className="flex justify-center items-center p-3 md:w-auto mt-3 mb-2">
            <button onClick={() => statusChangeHandler(invitationData, 'Reject')} className="border border-2 border-black text-xl rounded font-bold text-black px-7 py-2 mr-4">Reject</button>
            <button onClick={() => statusChangeHandler(invitationData, 'Active')} className="bg-[#0A6AF6] font-bold text-white text-xl px-7 py-2 rounded">Accept</button>
      </div>
      </div>

    </div>
  </div>
  )
}
