import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProxy } from "../proxy";

import "./App.css";
import Header from "./Header";

function PetInfo() {
  const [petName, setPetName] = useState("");
  const [type, setType] = useState("");
  const [gender, setGender] = useState("");
  const [born, setBorn] = useState("");
  const [underTreatmentFrom, setUnderTreatmentFrom] = useState("");
  const [chronicDiseases, setChronicDiseases] = useState("");
  const [medicines, setMedicines] = useState("");
  const [operations, setOperations] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [animalShelter, setAnimalShelter] = useState("");
  const [nutrition, setNutrition] = useState("");
  const [id, setId] = useState("");

  const [petToUpdate, setPetToUpdate] = useState({}); //this is the pet we get from the server and want to update

  const navigate = useNavigate();
  const proxy = useProxy();
  const params = useParams();

  //opening chosen pet in the page.
  useEffect(() => {
    async function fetchData() {
      const getPetObj = await proxy.getSinglePet(params.id);
      setId(params.id);
      setPetToUpdate(getPetObj[0]);
      fillInputFields(getPetObj[0]);
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  //getting chosen pet fields into the form
  function fillInputFields(petToUpdate) {
    if (petToUpdate !== undefined) {
      setPetName(petToUpdate.petName);
      setOwnerName(petToUpdate.ownerName);
      setType(petToUpdate.type);
      setBorn(petToUpdate.born);
      setGender(petToUpdate.gender);
      setUnderTreatmentFrom(petToUpdate.underTreatmentFrom);
      setAnimalShelter(petToUpdate.animalShelter);
      setChronicDiseases(petToUpdate.chronicDiseases);
      setMedicines(petToUpdate.medicines);
      setOperations(petToUpdate.operations);
      setNutrition(petToUpdate.nutrition);
    } else {
      console.log("no info");
    }
  }

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const pet = {
      petName: petName,
      type: type,
      gender: gender,
      born: born,
      underTreatmentFrom: underTreatmentFrom,
      chronicDiseases: chronicDiseases,
      medicines: medicines,
      operations: operations,
      ownerName: ownerName,
      animalShelter: animalShelter,
      nutrition: nutrition,
      id: id,
    };

    if(id!== ""){
      await proxy.updatePet(pet, id);
    } else{
      await proxy.saveNewPet(pet);
    }
 
  };

  function toHomepageHandler() {
    navigate("/");
  }

  //updating chosen pet
  // async function updateHandler(e) {
  
  //   const pet = {
  //     petName: petName,
  //     type: type,
  //     gender: gender,
  //     born: born,
  //     underTreatmentFrom: underTreatmentFrom,
  //     chronicDiseases: chronicDiseases,
  //     medicines: medicines,
  //     operations: operations,
  //     ownerName: ownerName,
  //     animalShelter: animalShelter,
  //     nutrition: nutrition,
  //     id: id,
  //   };

  //   if(id!== ""){
  //     await proxy.updatePet(pet, id);
  //   } else{
  //     await proxy.saveNewPet(pet);
  //   }
    

  // }

  console.log(born);

  ///////////////////////////////////////////////////////
  return (
    <div className="newTicket">
      <Header />
      <h2>Pet Information</h2>
      <form
        className="form-register"
        method="POST"
        action="/petinfo"
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
  );
}

export default PetInfo;
