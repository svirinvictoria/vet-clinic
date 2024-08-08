import { NavLink, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useProxy } from "../proxy";

import Header from "./Header";
import Footer from "./Footer";
import "./App.css";

function Homepage() {
  const proxy = useProxy();
  const navigate = useNavigate();
  const params = useParams();

  const [petList, setPetList] = useState([]);

  //getting list of pets from the server/////////////////
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    const listOfPets = await proxy.getListOfPets();
    setPetList(listOfPets);
  };

  // //opening single pet in PetTicket page
  // const petListReactElement = petList.map((pet, index) => {
  //   return (
  //     <NavLink key={index} className="" to={"/petticket/" + params.id}>
  //       <div>{pet.id}</div>
  //     </NavLink>
  //   );
  // });

  // function navigateToTicketHandler() {
  //   navigate("/petticket");
  // }

  const petInfoHandler = () => {
    navigate("/petinfo");
  };

  async function deleteHandler(pet) {
    console.log("delete is called");
    await proxy.deletePet(params.id);
    const returnUpdatedList = await proxy.getListOfPets();
    setPetList(returnUpdatedList);
  }

  ////////////////////////////////////////////////////////////////////////
  return (
    <div className="App">
      <Header />
      <div className="banner-box">
        <img src="/banner-home.png" alt=" banner" className="banner" />
      </div>
      <div className="main">
        <table className="table-style">
          <thead>
            <tr className="header-style">
              <th className="">Pet Name</th>
              <th>Owner Name</th>
              <th>Pet Type</th>
              <th>Pet Year of Birth</th>
              <th>Get Ticket</th>
              <th>Update Ticket</th>
              {/* <th>UPD</th> */}
              <th>Delete Ticket</th>
            </tr>
          </thead>
          <tbody className="table-border">
            {petList.map((pet, index) => {
              return (
                <tr key={index}>
                  <td className="table-border">{pet.petName}</td>
                  <td className="table-border">{pet.ownerName}</td>
                  <td className="table-border">{pet.type}</td>
                  <td className="table-border">{pet.born}</td>
                  <td className="table-border">
                    <NavLink to={"/petticket/" + pet.id}>
                      <div>📄 </div>
                    </NavLink>
                  </td>
                  <td className="table-border">
                    <NavLink to={"/petinfo/" + pet.id}>
                      <div> 📝 </div>
                    </NavLink>
                  </td>
                  {/* <td className="table-border">
                    <NavLink to={"/update/" + pet.id}>
                      <div> UPD </div>
                    </NavLink>
                  </td> */}
                  <td className="table-border">
                    <div
                      className=""
                      onClick={(e) => {
                        deleteHandler(pet.id);
                      }}
                    >
                      🗑
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <NavLink className="link" to="newpet">
        <div className="btn-wide" onClick={petInfoHandler}>
          {" "}
          Add new pet{" "}
        </div>
      </NavLink>
      <Footer />
    </div>
  );
}

export default Homepage;
