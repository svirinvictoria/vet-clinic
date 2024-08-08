export const useProxy = () => {
  //get list of pets - no params
  async function getListOfPets() {
    try {
      const list = await fetch("http://localhost:2000/list");
      const listAsArray = await list.json();
      // console.log(listAsArray);
      return listAsArray;
    } catch (err) {
      console.error(err);
      return "Failed to read list from server";
    }
  }

  // get single pet -  with URL params

  async function getSinglePet(id) {
    try {
      const singlePet = await fetch("http://localhost:2000/single/" + id);
      const singlePetAsJson = await singlePet.json();
      // console.log(singlePetAsJson)
      return singlePetAsJson.result;
    } catch (err) {
      console.error(err);
      return "Failed to read single item from server";
    }
  }

  //post with OBJECT - save new pet

  async function saveNewPet(pet) {
    try {
      const response = await fetch("http://localhost:2000/save", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(pet),
      });
      const responseAsJson = response.json();
      return responseAsJson;
    } catch (err) {
      console.error(err);
      return "Failed to save new item";
    }
  }

  //put with URL params - add new or update existing pet
  async function updatePet(pet, id) {
    try {
      const response = await fetch("http://localhost:2000/update/" + id, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(pet),
      });
      const responseAsJson = response.json();
      return responseAsJson;
    } catch (err) {
      console.error(err);
      return "Failed to update / to save an item";
    }
  }

  //delete with URL params - delete pet from list
  async function deletePet(id) {
    try {
      const response = await fetch("http://localhost:2000/delete/" + id, {
        method: "DELETE",
      });
      const responseAsJson = response.json();
      return responseAsJson();
    } catch (err) {
      console.error(err);
      return "Failed to delete an item";
    }
  }

  return {
    getListOfPets: getListOfPets,
    getSinglePet: getSinglePet,
    saveNewPet: saveNewPet,
    updatePet: updatePet,
    deletePet: deletePet,
  };
};
