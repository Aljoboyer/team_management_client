import { useState } from "react";
import { useGetAllUserQuery } from "../../redux/features/adminApi";
import DP from '../../assets/dp.png'

export default function AddMember() {
  const { data } = useGetAllUserQuery(undefined);
  const [searchResult, setSearchResult] = useState([])
  const [selectArr, setSelectArr]: any = useState([])

  const SearchHandler = (searchText: string) => {
    if (searchText?.length >= 2) {

      const searchData = data?.filter((item: any) => {
        const searchItem = searchText.toLocaleLowerCase();
       
        return (
          item?.email?.toLocaleLowerCase()?.indexOf(searchItem) > -1 ||
          item?.email?.toLocaleLowerCase()?.indexOf(searchItem) > -1
        );
      });

      setSearchResult(searchData);
    } else {
      setSearchResult([]);
    }
  }
  
  const selectHandler = (item: any) => {
      const findItem: any = selectArr?.find((user: any) => user?._id == item?._id)
      if(findItem?._id){
        return
      }
      else{
        setSelectArr([...selectArr, item])
      }
  }

  const RemoveHandler = (item: any) => {
    const filterData: any = selectArr?.filter((user: any) => user?._id !== item?._id)
    setSelectArr(filterData)
  }

  const OnChangeHandler = (e: any, teamMember: any) => {
    const fieldName = e.target.name;
    const fieldVal = e.target.value;
    selectArr?.map((item: any) =>{
      if(item?._id == teamMember?._id){
          item[fieldName] = fieldVal
      }
      return selectArr;
    })
  }
  console.log('selected Arr', selectArr)
  return (
    <div className='addMembder_container'>
        <div className="ms-12">
            <h4 className='addMember_title'>Add Team Member to New Project</h4>
            <p className='suggestion_text'>Start entering a mail id to add to your team</p>
        </div>
        <div className='search_field_div'>
            <div className="input_div">
                <input onChange={(e) => {
                  SearchHandler(e.target.value)
                }} className='search_input' placeholder='Enter user email' />
            </div>
            <button className='add_btn'>Add</button>
        </div>
        <div className="search_result mt-4">
            {
              searchResult?.map((item: any) => (
                <div onClick={() => selectHandler(item)} className="flex flex-row justify-start items-center cursor-pointer bg-[#3267B1] w-1/2 ms-12 border rounded">
                  <img src={DP} height="60px" width="60px"/>
                  <div className="ms-4">
                    <p className="text-white">{item?.name}</p>
                  </div>
                </div>
              ))
            }
        </div>

        <div className="relative overflow-x-auto details_table mt-12">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3 font-bold">
                    Name
                </th>
                <th scope="col" className="px-6 py-3 font-bold">
                    Title
                </th>
                <th scope="col" className="px-6 py-3 font-bold">
                    Active Hours
                </th>
                <th scope="col" className="px-6 py-3 font-bold">
                   Role
                </th>
            </tr>
        </thead>
        <tbody>
           {
            selectArr?.map((item: any) => (
              <tr className="bg-white add_Team_row">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item?.name}
                  {item?.email}
              </th>
              <td className="px-6 py-4">
                  <input onChange={(e) => OnChangeHandler(e, item)} name="user_title" placeholder="write title" />
              </td>
              <td className="px-6 py-4">
                05:00 - 09:00 PM (BD)
              </td>
              <td className="px-6 py-4">
                  <input onChange={(e) => OnChangeHandler(e, item)} name="team_role"  placeholder="Enter role" />
                  <span className="cursor-pointer" onClick={() => RemoveHandler(item)}>X</span>
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