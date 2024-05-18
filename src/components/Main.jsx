import React from 'react';
import { useState } from 'react';

const Main = () => {
  
  const handleSubmit = async (e) => {
    //show spinning icon
    setLoading(true);
    e.preventDefault();

    const fullname = e.target.fullname.value;
    const mobilenumber = e.target.mobilenumber.value;
    const email = e.target.email.value;
    const gender = e.target.gender.value;
    const dob = e.target.dob.value;
    const education = e.target.education.value;
    const percentage = e.target.percentage.value;
    const consultancyfee = e.target.consultancyfee.value;
    const countries = checkedCountries;
    const paymentmode= e.target.paymentmode.value

    console.log(
      fullname,
      mobilenumber,
      email,
      gender,
      dob,
      education,
      percentage,
      consultancyfee,
      countries,
      tests,
      paymentmode
    )

    const formData = {
      fullname,
      mobilenumber,
      email,
      gender,
      dob,
      education,
      percentage,
      consultancyfee,
      countries,
      tests,
      paymentmode
    };
    

    try {
        const response = await fetch('http://consultancybackend.vercel.app/senddata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            // Handle success (e.g., redirect or show a success message)
            console.log("Data sent sucessfully")
            //close confirm msg
            document.getElementById('closebtn').click();

            //alert thank you
            setLoading(false);
            location.reload()
            alert("Thank You for submmiting")
        } else {
            console.log("Error in sending data")
        }
    } catch (error) {
        console.error('Error sending form data:', error);
    }
};


const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
        setCheckedCountries((prevChecked) => [...prevChecked, value]);
    } else {
        setCheckedCountries((prevChecked) =>
            prevChecked.filter((country) => country !== value)
        );
    }
};


const handlescore = (event)=>{
  const updatedTests= {...tests,[event.target.id]:Number(event.target.value)}
  setTests(updatedTests)
}

const handleTests = (event) => {
  const { value, checked } = event.target;
  const ele = document.getElementById(value);
  if (checked) {
      ele.removeAttribute('hidden')
  } else {
      ele.setAttribute('hidden',false)
      //remove from tests as well
      delete tests[value]
  }
};

// const enablesubmitbtn = (event)=>{
//   const {value,checked}= event.target
//   const btn= document.getElementById('submitbtn')
//   if(checked){
//     btn.removeAttribute('disabled')
//   }
//   else{
//     btn.setAttribute('disabled',false)
//   }
// }

const [isFormValid, setIsFormValid] = useState(false);

// In your form's onChange or onBlur event, you can check the validity of the form
const handleInputChange = (event) => {
  // Your existing logic...

  // Check form validity
  const isFormValid = event.target.form.checkValidity();
  setIsFormValid(isFormValid);
};

const [fullname,setFullname]= useState('')
const [email,setEmail]= useState('')
const [mobilenumber,setMobileNumber]= useState('')
const [dob,setDob]= useState('')
const [gender,setGender]= useState('')
const [consultancyfee,setConsultancyFee]= useState(3000)
const [education,setEducation]= useState('')
const [percentage,setPercentage]= useState(0)
const [paymentmode,setPaymentMode]=useState('')

const [tests,setTests] = useState({})
const [checkedCountries, setCheckedCountries] = useState([]);

const [isLoading, setLoading] = useState(false)

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fullname">Full Name</label>
          <input type="text" className="form-control" id="fullname" placeholder='John Doe' onChange={(event)=>{handleInputChange(event);setFullname(event.target.value)}} required />
        </div>

        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" id="email" placeholder='johndoe@email.com' autoComplete='off' onChange={(event)=>{handleInputChange(event);setEmail(event.target.value)}} required />
        </div>

        <div className="mb-3">
          <label htmlFor="mobilenumber">Mobile Number</label>
          <input type="text" className="form-control" id="mobilenumber" placeholder='9876543210' onChange={(event)=>{handleInputChange(event); setMobileNumber(event.target.value)}} required/>
        </div>

        <div className="mb-3">
          <label className='pe-2' htmlFor="dob">Date of Birth</label>
          <input type="date" id='dob' onChange={(event)=>{handleInputChange(event); setDob(event.target.value)}} required/>
        </div>

        <div className='mb-3'>
        <p>Gender</p>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="gender" id="male" value="male" onChange={(event)=>{handleInputChange(event); setGender(event.target.value)}} required/>
          <label className="form-check-label" htmlFor="male">
            Male
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="gender" id="female" value="female" onChange={(event)=>{handleInputChange(event); setGender(event.target.value)}} required/>
          <label className="form-check-label" htmlFor="female">
            Female
          </label>
        </div>
      </div>

        <div className="mb-3">
        <label htmlFor="education">Higher Education</label>
        <select name="education" id="education" className="form-select" onChange={(event)=>{handleInputChange(event); setEducation(event.target.value)}} required>
          <option value=""> ---Choose Higher Education---</option>
          <option value="bachelors">Bachelors</option>
          <option value="masters">Masters</option>
          <option value="phd">P.H.D</option>
        </select>
        </div>

        <div className="mb-3">
          <label htmlFor="percentage">Percentage in Higher Education</label>
          <input type="number" className="form-control" id="percentage" onChange={(event)=>{handleInputChange(event); setPercentage(event.target.value)}} required />
        </div>
        

      <div className='mb-3'>
      <p>Countries you are intrested in:</p>
      <div className="input-group mb-3">
      <div className="form-check m-1">
        <input className="form-check-input" type="checkbox" value="usa" id="usa" onChange={(event)=>{handleCheckboxChange(event),handleInputChange(event)}} />
        <label className="form-check-label" htmlFor="usa">
            USA
        </label>
      </div>
      <div className="form-check m-1">
        <input className="form-check-input" type="checkbox" value="uk" id="uk" onChange={(event)=>{handleCheckboxChange(event); handleInputChange(event);}} />
        <label className="form-check-label" htmlFor="uk">
            UK
        </label>
      </div>
      <div className="form-check m-1">
        <input className="form-check-input" type="checkbox" value="canada" id="canada" onChange={(event)=>{handleCheckboxChange(event); handleInputChange(event);}} />
        <label className="form-check-label" htmlFor="canada">
            CANADA
        </label>
      </div>
      <div className="form-check m-1">
        <input className="form-check-input" type="checkbox" value="singapore" id="singapore" onChange={(event)=>{handleCheckboxChange(event); handleInputChange(event);}} />
        <label className="form-check-label" htmlFor="singapore">
            SINGAPORE
        </label>
      </div>
      <div className="form-check m-1">
        <input className="form-check-input" type="checkbox" value="europe" id="europe" onChange={(event)=>{handleCheckboxChange(event); handleInputChange(event);}} />
        <label className="form-check-label" htmlFor="europe">
            EUROPE
        </label>
      </div>

        </div>
      </div>


      <div className='mb-3'>
      <p>Tests you have appeared:</p>
      <div className="mb-3">
      <div className="form-check m-1">
        <input className="form-check-input" type="checkbox" value="ielts" id="ieltscheckbox" onChange={handleTests} />
        <label className="form-check-label" htmlFor="ielts">
            IELTS
        </label>
        <input className='form-control' type="number" id="ielts" onChange={handlescore} placeholder='Enter Score' hidden/>
      </div>
      <div className="form-check m-1">
        <input className="form-check-input" type="checkbox" value="pte" id="ptecheckbox" onChange={handleTests} />
        <label className="form-check-label" htmlFor="pte">
            PTE
        </label>
        <input className='form-control' type="number" id="pte" onChange={handlescore} placeholder='Enter Score' hidden/>
      </div>
      <div className="form-check m-1">
        <input className="form-check-input" type="checkbox" value="tofel" id="tofelcheckbox" onChange={handleTests} />
        <label className="form-check-label" htmlFor="tofel">
            TOFEL
        </label>
        <input className='form-control' type="number" id="tofel" onChange={handlescore} placeholder='Enter Score' hidden/>
      </div>
      <div className="form-check m-1">
        <input className="form-check-input" type="checkbox" value="dulingo" id="dulingocheckbox" onChange={handleTests} />
        <label className="form-check-label" htmlFor="dulingo">
            DULINGO
        </label>
        <input className='form-control' type="number" id="dulingo" onChange={handlescore} placeholder='Enter Score' hidden/>
      </div>

        </div>
      </div>



      <div className="mb-3">
          <label htmlFor='consultancyfee'>Consultancy Fee</label>
          <input id='consultancyfee' className="form-control" type="text" onChange={(event)=>{setConsultancyFee(event.target.value)}} value="3000" disabled readOnly />
      </div>


      <div className="mb-3">
        <label htmlFor="paymentmode">Payment Mode</label>
        <select name="paymentmode" id="paymentmode" className="form-select" onChange={(event)=>{handleInputChange(event); setPaymentMode(event.target.value)}} required>
          <option value=""> ---Choose Payment Method---</option>
          <option value="phonepe">PhonePe</option>
          <option value="gpay">GPay</option>
          <option value="card">Card</option>
          <option value="cash">Cash</option>
        </select>
      </div>

      <div className='mb-3'>
        <label htmlFor="terms">Terms and Conditions</label>
        <input type="checkbox" id="terms" onChange={handleInputChange} required/>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. In, ea. Ullam rem delectus quos iure nihil doloremque dolorum atque quibusdam molestiae ducimus exercitationem illo, mollitia rerum ad illum, magni expedita?</p>
      </div>

      <button type="button" id='submitbtn' className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" disabled={!isFormValid}>Submit</button>

      <div>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Confirm Details</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                  <p>Full Name: {fullname}</p>
                  <p>Email: {email}</p>
                  <p>Mobile Number: {mobilenumber}</p>
                  <p>Date of Birth: {dob}</p>
                  <p>Gender: {gender}</p>
                  <p>Higher Education: {education}</p>
                  <p>Percentage in Higher Education: {percentage}</p>
                  <p>Consultancy Fee: {consultancyfee}</p>
                  <p>Payment Method: {paymentmode}</p>
                  {/* <p>Tests: {JSON.stringify(tests)}</p> */}
                  {Object.entries(tests).length>0 &&(
                    <div>
                        <p>Tests appeared for: </p>
                        <ul>
                          {Object.entries(tests).map(([key, value])=>(
                            <li key={key}>{key}:{value}</li>
                          ))}
                        </ul>
                    </div>
                  )

                  }
                  {/* <p>Countries: {JSON.stringify(checkedCountries)}</p> */}
                  {checkedCountries.length > 0 && (
                    <div>
                      <p>Countries Interest in: </p>
                      <ul>
                        {checkedCountries.map((country, index) => (
                        <li key={index}>{country}</li>
                          ))}
                    </ul>
                    </div>
                  )}

              </div>
              <div className="modal-footer">
                <button type="button" id='closebtn' className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type='submit' disabled={isLoading} className="btn btn-primary">
                    {isLoading ? (
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : (
                            'Confirm'
                      )}
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </form>
    </div>
  )
}

export default Main
