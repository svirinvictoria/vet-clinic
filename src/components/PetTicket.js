import {
  // NavLink,
  // Routes,
  // Route,
  useNavigate,
  useParams,
} from "react-router-dom";
import Header from "./Header";
import { useProxy } from "../proxy";
import { useEffect, useState } from "react";

function PetTicket({ id }) {
  const navigate = useNavigate();
  const proxy = useProxy();
  const params = useParams();

  const [petResultArray, setPetResultArray] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const getPetObj = await proxy.getSinglePet(params.id);
      setPetResultArray(getPetObj);
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  console.log(petResultArray);

  function toHomepageHandler() {
    navigate("/");
  }
 

  //opening single pet in PetTicket page
  const petListReactElement = petResultArray.map((pet, index) => {
    return (
      <div key={index} className="info-box">
      
        <div className="pet-info">
          <p className="info-label"> Name of the pet:</p>
          {pet.petName}
        </div>
        <div className="pet-info">
          <p className="info-label"> Name of the owner:</p>
          {pet.ownerName}
        </div>
        <div className="pet-info">
          <p className="info-label"> Type of the pet:</p>
          {pet.type}
        </div>
        <div className="pet-info">
          <p className="info-label"> Gender of the pet: </p>
          {pet.gender}
        </div>
        <div className="pet-info">
          <p className="info-label"> Year of birth :</p>
          {pet.born}
        </div>
        
        <div className="pet-info">
          <p className="info-label"> Treated in the clinic from:</p>
          {pet.underTreatmentFrom}
        </div>
        <div className="pet-info">
          <p className="info-label"> Chronic deseases:</p>
          {pet.chronicDiseases}
        </div>
        <div className="pet-info">
          <p className="info-label"> Medicines:</p>
          {pet.medicines}
        </div>
        <div className="pet-info">
          <p className="info-label"> Operations:</p>
          {pet.operations}
        </div>
        <div className="pet-info">
          <p className="info-label"> Animal Shelter:</p>
          {pet.animalShelter}
        </div>
        <div className="pet-info">
          <p className="info-label"> Special nutrition:</p>
          {pet.nutrition}
        </div>
      </div>
    );
  });

  return (
    <div>
      <Header />
      <div className="ticket">
      <h2> Pet personal ticket </h2>
        <div className="inner-box">
          {petListReactElement}
          <div className="input-field">
              <textarea className="input-box"></textarea>
          </div>
          
        </div>
          
        <div className="btn-area">
         
          {/* <button className="btn-small">Delete</button> */}
          <button className="btn-small" onClick={toHomepageHandler}>To Homepage </button>
        </div>
      </div>
    </div>
  );
}

export default PetTicket;
