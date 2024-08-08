import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProxy } from "../proxy";

import "./App.css";

function Update () {

    //client page to the PUT 
    const proxy = useProxy();
    const params = useParams();
    const navigate=useNavigate();

    const [currentPet, setCurrentPet]=useState({});
    const[id, setId]=useState('');

    const [petName, setPetName]=useState('');
    const[ownerName, setOwnerName]=useState('');
    const [type, setType]=useState('');
    const[born, setBorn]=useState('');
    const[gender, setGender]=useState('');
    const [underTreatmentFrom, setUnderTreatmentFrom]=useState('');
    const [animalShelter, setAnimalShelter]=useState('');
    const [chronicDiseases, setChronicDiseases]=useState('');
    const [medicines, setMedicines]=useState('');
    const [operations, setOperations]=useState('');
    const [nutrition, setNutrition]=useState('');

    
    useEffect(()=>{
        async function fetchData() {
            //1. getting single pet from the main page (by id)
            const chosenPetList = await proxy.getSinglePet(params.id);
            // 2. const chosenPet = chosenPetList[0]; - the pet arrives as an array with one objec. 
            //here we get the object from the array

            //3.saving chosen pet into state
            setCurrentPet(chosenPetList[0]);
            //saving the ID of the chosen pet into state 
            setId(params.id);
            //4.1.filling the input fields with the properties of chosen pet
            updateFields(chosenPetList[0])
            
        }
        fetchData();
        // eslint-disable-next-line
    }, [])
    // console.log(currentPet)

    //4.2 inserting properties from the chosenPet into input fields
    function updateFields(currentPet){
       if(currentPet!==undefined){
        setPetName(currentPet.petName);
        setOwnerName(currentPet.ownerName);
        setType(currentPet.type);
        setBorn(currentPet.born);
        setGender(currentPet.gender);
        setUnderTreatmentFrom(currentPet.underTreatmentFrom);
        setAnimalShelter(currentPet.animalShelter);
        setChronicDiseases(currentPet.chronicDiseases);
        setMedicines(currentPet.medicines);
        setOperations(currentPet.operations);
        setNutrition(currentPet.nutrition);
       }
    }

    //5.updating or saving a pet
    async function formSubmitHandler(e){
        e.preventDefault();
        //5.1 creating a pet object made of states
        const pet = {
            petName:petName,
            ownerName:ownerName,
            type:type,
            born:born,
            gender:gender,
            underTreatmentFrom:underTreatmentFrom,
            animalShelter:animalShelter,
            chronicDiseases:chronicDiseases,
            medicines:medicines,
            operations:operations,
            nutrition:nutrition
        }

        if(pet.id!==""){
            await proxy.updatePet(pet, id)
        } else {
            await proxy.saveNewPet(pet)
        }
    }


    function toHomepageHandler(){
        navigate ("/")
    }
    ///////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div className="newTicket">
         
          <h2>Pet UPDATE</h2>
          <form
            className="form-register"
            method="POST"
            action="/update"
            onSubmit={formSubmitHandler}
          >
            <div className="form-floating">
              <label name="petName" htmlFor="petName">
                Pet Name:{" "}
              </label>
              <input
                value={petName}
                htmlFor="petName"
                type="text"
                name="petName"
                className="form-control"
                placeholder="Pet Name"
                required
                autoFocus
                onChange={(e) => {
                  setPetName(e.target.value);
                }}
              ></input>
            </div>
            <div className="form-floating">
              <label name="ownerName" htmlFor="ownerName">
                Owner's Name:{" "}
              </label>
              <input
                value={ownerName}
                htmlFor="ownerName"
                type="text"
                name="ownerName"
                className="form-control"
                placeholder="Owner Name"
                required
                onChange={(e) => {
                  setOwnerName(e.target.value);
                }}
              ></input>
            </div>
            <div className="form-floating">
              <label name="type" htmlFor="type">
                Type:{" "}
              </label>
              <input
                value={type}
                htmlFor="type"
                type="text"
                name="type"
                className="form-control"
                placeholder="Type"
                required
                onChange={(e) => {
                  setType(e.target.value);
                }}
              ></input>
            </div>
            <div className="form-floating">
              <label name="born" htmlFor="born">
                Year of Birth:{" "}
              </label>
              <input
                value={born}
                htmlFor="born"
                type="text"
                name="born"
                className="form-control"
                placeholder="Year of Birth"
                onChange={(e) => {
                  setBorn(e.target.value);
                }}
              ></input>
            </div>
            <div className="form-floating">
              <label name="gender" htmlFor="gender">
                Pet Gender:{" "}
              </label>
              <input
                value={gender}
                htmlFor="gender"
                type="text"
                name="gender"
                className="form-control"
                placeholder="Gender"
                required
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              ></input>
            </div>
            <div className="form-floating">
              <label name="underTreatmentFrom" htmlFor="underTreatmentFrom">
                Under Treatment From:{" "}
              </label>
              <input
                value={underTreatmentFrom}
                htmlFor="underTreatmentFrom"
                type="text"
                name="underTreatmentFrom"
                className="form-control"
                placeholder="Under Treatment From"
                onChange={(e) => {
                  setUnderTreatmentFrom(e.target.value);
                }}
              ></input>
            </div>
            <div className="form-floating">
              <label name="animalShelter" htmlFor="animalShelter">
                Animal Shelter:{" "}
              </label>
              <input
                value={animalShelter}
                htmlFor="animalShelter"
                type="text"
                name="animalShelter"
                className="form-control"
                placeholder="Animal Shelter"
                onChange={(e) => {
                  setAnimalShelter(e.target.value);
                }}
              ></input>
            </div>
            <div className="form-floating">
              <label name="chronicDiseases" htmlFor="chronicDiseases">
                Chronic Diseases:{" "}
              </label>
              <input
                value={chronicDiseases}
                htmlFor="chronicDiseases"
                type="text"
                name="chronicDiseases"
                className="form-control"
                placeholder="Chronic Diseases"
                onChange={(e) => {
                  setChronicDiseases(e.target.value);
                }}
              ></input>
            </div>
            <div className="form-floating">
              <label name="medicines" htmlFor="medicines">
                Medicines:{" "}
              </label>
              <input
                value={medicines}
                htmlFor="medicines"
                type="text"
                name="medicines"
                className="form-control"
                placeholder="Medicines"
                onChange={(e) => {
                  setMedicines(e.target.value);
                }}
              ></input>
            </div>
            <div className="form-floating">
              <label name="operations" htmlFor="operations">
                Operations:{" "}
              </label>
              <input
                value={operations}
                htmlFor="operations"
                type="text"
                name="operations"
                className="form-control"
                placeholder="Operations"
                onChange={(e) => {
                  setOperations(e.target.value);
                }}
              ></input>
            </div>
            <div className="form-floating">
              <label name="nutrition" htmlFor="nutrition">
                Nutrition:{" "}
              </label>
              <input
                value={nutrition}
                htmlFor="nutrition"
                type="text"
                name="nutrition"
                className="form-control"
                placeholder="Nutrition"
                onChange={(e) => {
                  setNutrition(e.target.value);
                }}
              ></input>
            </div>
    
            <div className="btn-area">
              <button className="btn-small" type="submit">
              Update
              </button>
    
              <button className="btn-small" onClick={toHomepageHandler}>
                To Homepage
              </button>
            </div>
          </form>
        </div>
    )
}

export default Update;