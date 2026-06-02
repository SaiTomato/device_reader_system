// import {

// useEffect,
// useState

// } from "react";

// import {

// getDropdownData

// } from "../services/masterService";

// import type {

// DropdownOptions

// } from "../types/entity/master";

// function PcEditPage() {

// const [pcName, setPcName] = useState("");

// const [dropdownOptions, setDropdownOptions] = useState<DropdownOptions>({});
// const [loading, setLoading] = useState<boolean>(true);
// const [error, setError] = useState<string | null>(null);

// useEffect(() => {

//   const initData = async () => {
//       try {
//         setLoading(true);
//         const data = await getDropdownData(); // 调用 Service 层
//         setDropdownOptions(data);
//       } catch (err: any) {
//         setError(err.message || "数据加载失败");
//       } finally {
//         setLoading(false);
//       }
//     };

//     initData();
// }, []);

// if (loading) return <div>加载中...</div>;
// if (error) return <div>错误: {error}</div>;

// return (

// <div>

//   <h1>
//     PC Edit Page
//   </h1>

//   <div>

//     <label>
//       PC名
//     </label>

//     <br />

//     <input

//       type="text"

//       value={pcName}

//       onChange={(event) => {

//         setPcName(
//           event.target.value
//         );

//       }}

//     />
//     <p>入力値:{pcName}</p>

//   </div>

//   <div>
//     <select>
//       <option value="">请选择状况</option>
//       {dropdownOptions.pcStatus?.map(item => (
//         <option key={item.value} value={item.value}>{item.label}</option>
//       ))}
//     </select>
//   </div>
//   <div>
//     <select>
//       <option value="">请选择分類</option>
//       {dropdownOptions.pcCategory?.map(item => (
//         <option key={item.value} value={item.value}>{item.label}</option>
//       ))}
//     </select>
//   </div>
//   <div>
//     <select>
//       <option value="">请选择用途</option>
//       {dropdownOptions.pcUsage?.map(item => (
//         <option key={item.value} value={item.value}>{item.label}</option>
//       ))}
//     </select>
//   </div>
//   <div>
//     <select>
//       <option value="">请选择区分</option>
//       {dropdownOptions.pcDivision?.map(item => (
//         <option key={item.value} value={item.value}>{item.label}</option>
//       ))}
//     </select>
//   </div>
//   <div>
//     <select>
//       <option value="">请选择場所</option>
//       {dropdownOptions.pcLocation?.map(item => (
//         <option key={item.value} value={item.value}>{item.label}</option>
//       ))}
//     </select>
//   </div>
// </div>

// );

// }

// export default PcEditPage;
