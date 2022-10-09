import React, {useState} from 'react';
import Student from './Student';
import Course from './Course';
import ViewSchedule from './ViewSchedule';
import Confirmation from './Confirmation';

export default function PageSwitch () {

const [page, setPage] = useState(0);
const [formData, setFormData] = useState({
    firstName: '',
    lName: '',
    courses:'', 
    hoursAvail:'', 
    coursePref:'', 
    facultyPref:''
  });

const nextPage = () =>{
  setPage(page+1)
}

const prevPage = () =>{
  setPage(page-1)
}
const fNameValidation = () =>{
  var validation = false;
  if(formData.firstName === '' || formData.firstName.length <= 1){
  return(
        validation
  )
  } else{
    validation = true;
     return(
      validation
  )}
}

const lNameValidation = () =>{
  var validation = false;
  if(formData.lName === '' || formData.lName.length <= 1){
  return(
        validation
  )
  } else{
    validation = true;
     return(
      validation
  )}
}

function handleSubmit () {
    if (page === 0) {
        nextPage();
        console.log(formData);
    }
    else if (page === 1) {
        setPage(page + 1);
        console.log(formData);
      }
      else if (page === 2) {
        setPage(0);
      }
    }

  const conditionalComponent = () => {
    switch (page) {
      case 0:
        return <Student formData={FormData} setFormData = {setFormData} />;
      case 1:
        return <Course formData={FormData} setFormData = {setFormData} />;
       case 2:
         return <ViewSchedule formData={FormData} setFormData = {setFormData} />;
      case 3:
        return <Confirmation formData={FormData} setFormData = {setFormData} />;
       default:
         return <Student formData={FormData} setFormData = {setFormData} />;
    }
  }; 

return (
        <>
          {conditionalComponent()}
          <button onClick={handleSubmit}>
            { page === 0 || page === 1 || page===2 ? "Next" : "Submit" }
          </button>
          {
            page > 0 && <button onClick={prevPage}>Back</button>
          }
        </>
      )
}
