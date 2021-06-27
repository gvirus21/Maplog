//dom selectors
const card = document.getElementById("card");
const compContainer = document.querySelector(".card__comp--container");
const form = document.getElementById("card__form");
const formHeading = document.querySelector(".card__form--heading");
const formDescription = document.querySelector(".card__form--description");
const formSubmit = document.getElementById("card__form--btn");

class App {
  #map;
  #mapEvent;
  constructor() {
    //get location
    this._getLoaction();
  }
  _getLoaction() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          console.error("Couldn't get the location");
        }
      );
    }
  }
  _loadMap(pos) {
    let { latitude: lat, longitude: lng } = pos.coords;
    let coords = [lat, lng];

    this.#map = L.map("map").setView(coords, 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //click on map

    this.#map.on("click", this._showForm.bind(this));
  }
  _showForm() {
    console.log("showform");
    //make input form visible

    form.style.display = "flex";
    formSubmit.addEventListener("click", () => {
      this._addField();
    });
    // formSubmit.removeEventListener("click");
    // formSubmit.removeEventListener("click", this._addField.bind(this));
    //empty fields
  }

  _addField() {
    if (!formHeading.value || !formDescription.value) {
      alert("empty fields");
    }

    if (formHeading.value && formDescription.value) {
      //created comp div
      const comp = document.createElement("div");
      comp.classList.add("card__comp--div");
      //created comp info div
      const compInfo = document.createElement("div");
      compInfo.classList.add("comp__info");
      comp.appendChild(compInfo);
      //created comp title
      const compTitle = document.createElement("h1");
      compTitle.classList.add("comp__info--tilte");
      compTitle.innerText = formHeading.value;
      compInfo.appendChild(compTitle);

      //created comp description
      const compDescription = document.createElement("p");
      compDescription.innerText = formDescription.value;
      compDescription.classList.add("comp__info--description");
      compInfo.appendChild(compDescription);

      //created submit button
      const clearBtn = document.createElement("button");
      clearBtn.classList.add("comp--clear");
      clearBtn.innerText = "clear";
      comp.appendChild(clearBtn);

      //Append comp to comp container
      compContainer.appendChild(comp);

      //hide form
      this._hideForm();
    }
  }

  _test() {
    console.log("test");
  }
  _hideForm() {
    console.log("hide");
    form.style.display = "none";
    formHeading.value = "";
    formDescription.value = "";
  }
}

const app = new App();
