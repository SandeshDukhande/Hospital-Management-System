import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import patientservice from '../services/patientservice';
import patientvalidation from '../validation/patientvalidation';

function PatientRegister() {
  const [user, setUser] = useState({
    name: '',
    gender: '',
    address: '',
    age: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [patientid, setPatientid] = useState();

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const validationErrors = patientvalidation(user);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log(user);
      user.userid = patientid;
      patientservice
        .register(user)
        .then((resp) => {
          console.log(resp);
          alert('Patient registered successfully');
          navigate('/patients');
        })
        .catch((error) => console.log('Error', error));
    } else {
      alert('Please fill all required fields correctly');
    }
  };

  return (
    <>
      <Header />
      <div className='container-fluid'>
        <div className='row'>
          <div
            className='col-sm-2 bg-transparent p-0 border-right border-dark'
            style={{ height: 'calc(100vh - 80px)' }}
          >
            <SideBar />
          </div>
          <div className='col-sm-6 offset-2'>
            <form onSubmit={handleSubmit}>
              <div className='card shadow mx-auto mt-3'>
                <div className='card-body'>
                  <h4 className='text-center p-2'>Patient Registration</h4>
                  <div className='form-group form-row'>
                    <label className='col-sm-4 form-control-label'>
                      Full Name
                    </label>
                    <div className='col-sm-8'>
                      <input
                        type='text'
                        name='name'
                        value={user.name}
                        onChange={handleInput}
                        className='form-control form-control-sm'
                      />
                      {errors.name && (
                        <small className='text-danger float-right'>
                          {errors.name}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className='form-group form-row'>
                    <label className='col-sm-4 form-control-label'>
                      Gender
                    </label>
                    <div className='col-sm-8'>
                      <select
                        name='gender'
                        value={user.gender}
                        onChange={handleInput}
                        className='form-control form-control-sm'
                      >
                        <option value=''>Select Gender</option>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                      </select>
                      {errors.gender && (
                        <small className='text-danger float-right'>
                          {errors.gender}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className='form-group form-row'>
                    <label className='col-sm-4 form-control-label'>
                      Address
                    </label>
                    <div className='col-sm-8'>
                      <input
                        type='text'
                        name='address'
                        value={user.address}
                        onChange={handleInput}
                        className='form-control form-control-sm'
                      />
                      {errors.address && (
                        <small className='text-danger float-right'>
                          {errors.address}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className='form-group form-row'>
                    <label className='col-sm-4 form-control-label'>
                      Age (in years)
                    </label>
                    <div className='col-sm-8'>
                      <input
                        type='number'
                        name='age'
                        value={user.age}
                        onChange={handleInput}
                        className='form-control form-control-sm'
                      />
                      {errors.age && (
                        <small className='text-danger float-right'>
                          {errors.age}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className='form-group form-row'>
                    <label className='col-sm-4 form-control-label'>Phone</label>
                    <div className='col-sm-8'>
                      <input
                        type='text'
                        maxLength='13'
                        name='phone'
                        value={user.phone}
                        onChange={handleInput}
                        className='form-control form-control-sm'
                      />
                      {errors.phone && (
                        <small className='text-danger float-right'>
                          {errors.phone}
                        </small>
                      )}
                    </div>
                  </div>
                  <button type='submit' className='btn btn-primary btn-sm float-right'>
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientRegister;



// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import Header from '../components/Header'
// import SideBar from '../components/SideBar'
// import patientservice from '../services/patientservice'


// function PatientRegister() {
//   const [user, setUser] = useState({
//     name: '',
//     gender: '',
//     address: '',
//     age: '',
//     phone: ''
//   })
//   const [errors, setErrors] = useState({})
//   const navigate = useNavigate()
//   const [patientid, setPatientid] = useState()

//   const handleInput = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value })
//   }

//   const validateFields = () => {
//     let validationErrors = {}
//     if (!user.name) validationErrors.name = 'Full Name is required'
//     if (!user.gender) validationErrors.gender = 'Gender is required'
//     if (!user.address) validationErrors.address = 'Address is required'
//     if (!user.age) validationErrors.age = 'Age is required'
//     if (!user.phone) validationErrors.phone = 'Phone number is required'

//     // Additional validation if needed
//     if (user.phone && !/^\d{10}$/.test(user.phone)) validationErrors.phone = 'Phone number must be 10 digits'

//     return validationErrors
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     const validationErrors = validateFields()
//     setErrors(validationErrors)
    
//     if (Object.keys(validationErrors).length === 0) {
//       console.log(user)
//       user.userid = patientid
//       patientservice
//         .register(user)
//         .then((resp) => {
//           console.log(resp)
//           alert('Patient registered successfully')
//           navigate('/patients')
//         })
//         .catch((error) => console.log('Error', error))
//     } else {
//       alert('Please fill all required fields')
//     }
//   }

//   return (
//     <>
//       <Header />
//       <div className='container-fluid'>
//         <div className='row'>
//           <div
//             className='col-sm-2 bg-transparent p-0 border-right border-dark'
//             style={{ height: 'calc(100vh - 80px)' }}
//           >
//             <SideBar />
//           </div>
//           <div className='col-sm-6 offset-2'>
//             <form onSubmit={handleSubmit}>
//               <div className='card shadow mx-auto mt-3'>
//                 <div className='card-body'>
//                   <h4 className='text-center p-2'>Patient Registration</h4>
//                   <div className='form-group form-row'>
//                     <label className='col-sm-4 form-control-label'>
//                       Full Name
//                     </label>
//                     <div className='col-sm-8'>
//                       <input
//                         type='text'
//                         name='name'
//                         value={user.name}
//                         onChange={handleInput}
//                         className='form-control form-control-sm'
//                       />
//                       {errors.name && (
//                         <small className='text-danger float-right'>
//                           {errors.name}
//                         </small>
//                       )}
//                     </div>
//                   </div>
//                   <div className='form-group form-row'>
//                     <label className='col-sm-4 form-control-label'>
//                       Gender
//                     </label>
//                     <div className='col-sm-8'>
//                       <select
//                         name='gender'
//                         value={user.gender}
//                         onChange={handleInput}
//                         className='form-control form-control-sm'
//                       >
//                         <option value=''>Select Gender</option>
//                         <option value='Male'>Male</option>
//                         <option value='Female'>Female</option>
//                       </select>
//                       {errors.gender && (
//                         <small className='text-danger float-right'>
//                           {errors.gender}
//                         </small>
//                       )}
//                     </div>
//                   </div>
//                   <div className='form-group form-row'>
//                     <label className='col-sm-4 form-control-label'>
//                       Address
//                     </label>
//                     <div className='col-sm-8'>
//                       <input
//                         type='text'
//                         name='address'
//                         value={user.address}
//                         onChange={handleInput}
//                         className='form-control form-control-sm'
//                       />
//                       {errors.address && (
//                         <small className='text-danger float-right'>
//                           {errors.address}
//                         </small>
//                       )}
//                     </div>
//                   </div>
//                   <div className='form-group form-row'>
//                     <label className='col-sm-4 form-control-label'>
//                       Age (in years)
//                     </label>
//                     <div className='col-sm-8'>
//                       <input
//                         type='number'
//                         name='age'
//                         value={user.age}
//                         onChange={handleInput}
//                         className='form-control form-control-sm'
//                       />
//                       {errors.age && (
//                         <small className='text-danger float-right'>
//                           {errors.age}
//                         </small>
//                       )}
//                     </div>
//                   </div>
//                   <div className='form-group form-row'>
//                     <label className='col-sm-4 form-control-label'>Phone</label>
//                     <div className='col-sm-8'>
//                       <input
//                         type='text'
//                         maxLength='10'
//                         name='phone'
//                         value={user.phone}
//                         onChange={handleInput}
//                         className='form-control form-control-sm'
//                       />
//                       {errors.phone && (
//                         <small className='text-danger float-right'>
//                           {errors.phone}
//                         </small>
//                       )}
//                     </div>
//                   </div>
//                   <button type='submit' className='btn btn-primary btn-sm float-right'>
//                     Submit
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default PatientRegister




// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import Header from '../components/Header'
// import SideBar from '../components/SideBar'
// import patientservice from '../services/patientservice'
// import patientvalidation from '../validation/patientvalidation'


// function PatientRegister() {
//   const [user, setUser] = useState(null)
//   const [errors, setErrors] = useState({})
//   const navigate = useNavigate()
//   const [patientid, setpatientid] = useState()

//   const handleInput = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     setErrors(patientvalidation(user))

//     if (Object.keys(errors).length === 0) {
//       console.log(user)
//       user.userid = patientid
//       patientservice
//         .register(user)
//         .then((resp) => {
//           console.log(resp)
//           alert('Patient registered successfully')
//           navigate('/patients')
//         })
//         .catch((error) => console.log('Error', error))
//     }
//   }

//   return (
//     <>
//       <Header />
//       <div className='container-fluid'>
//         <div className='row'>
//           <div
//             className='col-sm-2 bg-transparent p-0 border-right border-dark'
//             style={{ height: 'calc(100vh - 80px)' }}
//           >
//            <SideBar />
//           </div>
//           <div className='col-sm-6 offset-2'>
//             <form>
//             <div className='card shadow mx-auto mt-3'>
//               <div className='card-body'>
//                   <h4 className='text-center p-2'>Patient Registration</h4>
//                   <div className='form-group form-row'>
//                     <label className='col-sm-4 form-control-label'>
//                       Full Name
//                     </label>
//                     <div className='col-sm-8'>
//                       <input
//                         type='text'
//                         name='name'
//                         value={user?.name}
//                         onChange={handleInput}
//                         className='form-control form-control-sm'
//                       />
//                       {errors?.name && (
//                         <small className='text-danger float-right'>
//                           {errors?.name}
//                         </small>
//                       )}
//                     </div>
//                   </div>
//                   <div className='form-group form-row'>
//                     <label className='col-sm-4 form-control-label'>
//                       Gender
//                     </label>
//                     <div className='col-sm-8'>
//                       <select
//                         name='gender'
//                         value={user?.gender}
//                         onChange={handleInput}
//                         className='form-control form-control-sm'
//                       >
//                         <option value=''>Select Gender</option>
//                         <option>Male</option>
//                         <option>Female</option>
//                       </select>
//                       {errors?.lname && (
//                         <small className='text-danger float-right'>
//                           {errors?.lname}
//                         </small>
//                       )}
//                     </div>
//                   </div>
//                   <div className='form-group form-row'>
//                     <label className='col-sm-4 form-control-label'>
//                       Address
//                     </label>
//                     <div className='col-sm-8'>
//                       <input
//                         type='text'
//                         name='address'
//                         value={user?.address}
//                         onChange={handleInput}
//                         className='form-control form-control-sm'
//                       />
//                       {errors?.address && (
//                         <small className='text-danger float-right'>
//                           {errors?.address}
//                         </small>
//                       )}
//                     </div>
//                   </div>
//                   <div className='form-group form-row'>
//                     <label className='col-sm-4 form-control-label'>
//                       Age (in years)
//                     </label>
//                     <div className='col-sm-8'>
//                       <input
//                         type='number'
//                         name='age'
//                         value={user?.age}
//                         onChange={handleInput}
//                         className='form-control form-control-sm'
//                       />
//                       {errors?.age && (
//                         <small className='text-danger float-right'>
//                           {errors?.age}
//                         </small>
//                       )}
//                     </div>
//                   </div>

//                   <div className='form-group form-row'>
//                     <label className='col-sm-4 form-control-label'>Phone</label>
//                     <div className='col-sm-8'>
//                       <input
//                         type='text'
//                         maxLength='10'
//                         name='phone'
//                         value={user?.phone}
//                         onChange={handleInput}
//                         className='form-control form-control-sm'
//                       />
//                       {errors?.phone && (
//                         <small className='text-danger float-right'>
//                           {errors?.phone}
//                         </small>
//                       )}
//                     </div>
//                   </div>                  
//                   <button onClick={handleSubmit} className='btn btn-primary btn-sm float-right'>
//                     Submit
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default PatientRegister