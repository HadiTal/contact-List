//class

class infoContact {
    constructor(infoData) {
        const { firstName, phone, email } = infoData;

        this.firstName = firstName;
        this.phone = phone;
        this.email = email;
    }

    //Check if there is a contact list in the Local Storage browser
    checkLocalStorage() {
        const infoContact = [];
        let resultLocalStorage;

        if (localStorage.getItem("InfoContact") === null) {
            localStorage.setItem("InfoContact", JSON.stringify(infoContact));
            resultLocalStorage = JSON.parse(localStorage.getItem("InfoContact"));
        } else {
            resultLocalStorage = JSON.parse(localStorage.getItem("InfoContact"));
        }

        return resultLocalStorage;
    }

    //Store contact information in local storage
    saveInfoContact() {
        let id = 1;

        const infoContact = this.checkLocalStorage();

        if (infoContact.length === 0) {
            infoContact.push({
                idContact: id,
                firstNameContact: this.firstName.value,
                emailContact: this.email.value,
                phoneContact: this.phone.value,
            });

            localStorage.setItem("InfoContact", JSON.stringify(infoContact));
        } else {
            let listContact = JSON.parse(localStorage.getItem("InfoContact"));

            id = listContact[listContact.length - 1].idContact;

            id = id + 1;

            infoContact.push({
                idContact: id,
                firstNameContact: this.firstName.value,
                emailContact: this.email.value,
                phoneContact: this.phone.value,
            });

            //Save contacts with entered information
            localStorage.setItem("InfoContact", JSON.stringify(infoContact));

            //Empty the content of the inputs
            html.resetInput();
        }
    }

    //Delete infoContact
    deleteContact(infoContact) {


        const [idContact, firstNameContact, email, phoneNumber] = infoContact;

        const listContact = JSON.parse(localStorage.getItem('InfoContact'));

        const cards = document.querySelectorAll('.card')

        let id = Number(idContact);

        //Delete sent element
        for (let i = 0; i < listContact.length; i++) {

            if (listContact[i].idContact === id) {
                listContact.splice(i, 1);
            }

        }

        //Update the user list in Local Storage
        localStorage.setItem('InfoContact', JSON.stringify(listContact));

        //Delete all contact elements
        cards.forEach(element => {

            element.remove();

        });

        //Load elements for the remaining contacts
        html.loadElemntInfo();

    }


    deleteAllContact() {

        const cards = document.querySelectorAll('.card')


        localStorage.clear();

        //Delete all contact elements
        cards.forEach(element => {

            element.remove();

        });

    }
}

class HTMLUI {
    constructor(firstName, email, phone) {
        this.firstName = firstName;

        this.phone = phone;

        this.email = email;
    }

    //Check new user fields for registration
    checkFileds() {
        const valueElement = [];

        valueElement.push(
            this.firstName.value,
            this.phone.value,
            this.email.value,
            /^[0-9]+$/,
            /^\d{11}$/,
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        );

        const [firstName, phoneNumber, email, valiFistName, valiPhone, valiEmail] =
        valueElement;

        if (
            firstName !== "" &&
            phoneNumber !== "" &&
            email !== "" &&
            !firstName.match(valiFistName) &&
            phoneNumber.match(valiPhone) &&
            email.match(valiEmail)
        ) {
            this.firstName.classList.add("border-correct");
            this.firstName.classList.remove("bordrr-normal");
            this.firstName.classList.remove("bordrr-error");
            this.phone.classList.add("border-correct");
            this.phone.classList.remove("bordrr-normal");
            this.phone.classList.remove("bordrr-error");
            this.email.classList.add("border-correct");
            this.email.classList.remove("bordrr-normal");
            this.email.classList.remove("bordrr-error");
            return true;
        } else {
            this.firstName.classList.remove("border-correct");
            this.firstName.classList.remove("bordrr-normal");
            this.firstName.classList.add("bordrr-error");
            this.phone.classList.remove("border-correct");
            this.phone.classList.remove("bordrr-normal");
            this.phone.classList.add("bordrr-error");
            this.email.classList.remove("border-correct");
            this.email.classList.remove("bordrr-normal");
            this.email.classList.add("bordrr-error");
            return false;
        }
    }

    //Check the elements when blur occurs

    checkElementInput(element) {
        const valueElement = [];

        valueElement.push(
            /^[0-9]+$/,
            /^\d{11}$/,
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        );

        const [firstName, phoneNumber, email, valiFistName, valiPhone, valiEmail] =
        valueElement;

        //nameInput bordrr-normal
        if (element.classList.contains("nameInput")) {
            if (element.value !== "" && !element.value.match(/^[0-9]+$/)) {
                element.classList.add("border-correct");
                element.classList.remove("bordrr-normal");
                element.classList.remove("bordrr-error");
            } else {
                element.classList.remove("border-correct");
                element.classList.remove("bordrr-normal");
                element.classList.add("bordrr-error");
            }
        }

        if (element.classList.contains("emaiInput")) {
            if (element.value !== "" && element.value.match(valiEmail)) {
                element.classList.add("border-correct");
                element.classList.remove("bordrr-normal");
                element.classList.remove("bordrr-error");
            } else {
                element.classList.remove("border-correct");
                element.classList.remove("bordrr-normal");
                element.classList.add("bordrr-error");
            }
        }

        if (element.classList.contains("phoneInput")) {
            if (element.value !== "" && element.value.match(valiPhone)) {
                element.classList.add("border-correct");
                element.classList.remove("bordrr-normal");
                element.classList.remove("bordrr-error");
            } else {
                element.classList.remove("border-correct");
                element.classList.remove("bordrr-normal");
                element.classList.add("bordrr-error");
            }
        }
    }

    //Create elements for each contact
    createElementContact() {
        const infoContact = [];

        const conatinerCard = document.querySelector(".container-card");

        const lsitUsers = JSON.parse(localStorage.getItem("InfoContact"));

        console.log(lsitUsers);

        infoContact.push(
            lsitUsers[lsitUsers.length - 1].idContact,
            lsitUsers[lsitUsers.length - 1].firstNameContact,
            lsitUsers[lsitUsers.length - 1].phoneContact,
            lsitUsers[lsitUsers.length - 1].emailContact
        );

        const [idContact, fistNameContact, PhoneContact, emailContact] =
        infoContact;

        //createElement
        const cardEl = document.createElement("div");
        const contentUserElFirst = document.createElement("div");
        const contentUserElSecend = document.createElement("div");
        const contentUserElthrid = document.createElement("div");
        const contentUserElFour = document.createElement("div");
        const spanEl = document.createElement("span");
        const iElement = document.createElement("i");

        const titleElOne = document.createElement("label");
        const titleElTwo = document.createElement("label");
        const titleElThrid = document.createElement("label");
        const titleElFour = document.createElement("label");

        const valueElOne = document.createElement("label");
        const valueTwo = document.createElement("label");
        const valueThrid = document.createElement("label");
        const valueFour = document.createElement("label");

        const contantBtn = document.createElement("div");
        const BtnDel = document.createElement("button");

        //Assign class to elements
        cardEl.classList.add("card");
        contentUserElFirst.classList.add("content-user");
        contentUserElSecend.classList.add("content-user");
        contentUserElthrid.classList.add("content-user");
        contentUserElFour.classList.add("content-user");

        iElement.classList.add("fas", "fa-trash");
        iElement.setAttribute("aria-hidden", true);

        titleElOne.classList.add("title");
        titleElTwo.classList.add("title");
        titleElThrid.classList.add("title");
        titleElFour.classList.add("title");

        valueElOne.classList.add("value");
        valueTwo.classList.add("value");
        valueThrid.classList.add("value");
        valueFour.classList.add("value");

        contantBtn.classList.add("content-btn");
        BtnDel.classList.add("btn-del");

        cardEl.appendChild(contentUserElFirst);
        contentUserElFirst.appendChild(titleElOne);
        contentUserElFirst.appendChild(valueElOne);
        titleElOne.textContent = `شماره شناسه  :`;
        valueElOne.textContent = idContact;

        cardEl.appendChild(contentUserElSecend);
        contentUserElSecend.appendChild(titleElTwo);
        contentUserElSecend.appendChild(valueTwo);
        titleElTwo.textContent = `نام: `;
        valueTwo.textContent = fistNameContact;

        cardEl.appendChild(contentUserElthrid);
        contentUserElthrid.appendChild(titleElThrid);
        contentUserElthrid.appendChild(valueThrid);
        titleElThrid.textContent = `ایمیل :`;
        valueThrid.textContent = emailContact;

        cardEl.appendChild(contentUserElFour);
        contentUserElFour.appendChild(titleElFour);
        contentUserElFour.appendChild(valueFour);
        titleElFour.textContent = ` شماره تماس: `;
        valueFour.textContent = PhoneContact;

        cardEl.appendChild(contantBtn);
        contantBtn.appendChild(BtnDel);
        BtnDel.textContent = `حذف مخاطب`;
        BtnDel.appendChild(iElement);
        conatinerCard.appendChild(cardEl);
    }

    //Load elements to display contact information
    loadElemntInfo() {


        const lsitUsers = JSON.parse(localStorage.getItem("InfoContact"));


        if (lsitUsers !== null) {
            const conatinerCard = document.querySelector(".container-card");

            for (let i = 0; i < lsitUsers.length; i++) {
                //createElement
                const cardEl = document.createElement("div");
                const contentUserElFirst = document.createElement("div");
                const contentUserElSecend = document.createElement("div");
                const contentUserElthrid = document.createElement("div");
                const contentUserElFour = document.createElement("div");
                const spanEl = document.createElement("span");
                const iElement = document.createElement("i");

                const titleElOne = document.createElement("label");
                const titleElTwo = document.createElement("label");
                const titleElThrid = document.createElement("label");
                const titleElFour = document.createElement("label");

                const valueElOne = document.createElement("label");
                const valueTwo = document.createElement("label");
                const valueThrid = document.createElement("label");
                const valueFour = document.createElement("label");

                const contantBtn = document.createElement("div");
                const BtnDel = document.createElement("button");

                //Assign class to elements
                cardEl.classList.add("card");
                contentUserElFirst.classList.add("content-user");
                contentUserElSecend.classList.add("content-user");
                contentUserElthrid.classList.add("content-user");
                contentUserElFour.classList.add("content-user");

                iElement.classList.add("fas", "fa-trash");
                iElement.setAttribute("aria-hidden", true);

                titleElOne.classList.add("title");
                titleElTwo.classList.add("title");
                titleElThrid.classList.add("title");
                titleElFour.classList.add("title");

                valueElOne.classList.add("value");
                valueTwo.classList.add("value");
                valueThrid.classList.add("value");
                valueFour.classList.add("value");

                contantBtn.classList.add("content-btn");
                BtnDel.classList.add("btn-del");

                cardEl.appendChild(contentUserElFirst);
                contentUserElFirst.appendChild(titleElOne);
                contentUserElFirst.appendChild(valueElOne);
                titleElOne.textContent = `شماره شناسه  :`;
                valueElOne.textContent = lsitUsers[i].idContact;

                cardEl.appendChild(contentUserElSecend);
                contentUserElSecend.appendChild(titleElTwo);
                contentUserElSecend.appendChild(valueTwo);
                titleElTwo.textContent = `نام: `;
                valueTwo.textContent = lsitUsers[i].firstNameContact;

                cardEl.appendChild(contentUserElthrid);
                contentUserElthrid.appendChild(titleElThrid);
                contentUserElthrid.appendChild(valueThrid);
                titleElThrid.textContent = `ایمیل :`;
                valueThrid.textContent = lsitUsers[i].emailContact;

                cardEl.appendChild(contentUserElFour);
                contentUserElFour.appendChild(titleElFour);
                contentUserElFour.appendChild(valueFour);
                titleElFour.textContent = ` شماره تماس: `;
                valueFour.textContent = lsitUsers[i].phoneContact;

                cardEl.appendChild(contantBtn);
                contantBtn.appendChild(BtnDel);
                BtnDel.textContent = `حذف مخاطب`;
                BtnDel.appendChild(iElement);
                conatinerCard.appendChild(cardEl);
            }
        }


    }

    //Empty the content of the inputs
    resetInput() {

        this.firstName.value = '';
        this.email.value = '';
        this.phone.value = '';

    }
}

//variable
const btnAddContact = document.querySelector(".BtnaddContact");
const inputName = document.querySelector(".nameInput");
const inputEmail = document.querySelector(".emaiInput");
const phoneNumber = document.querySelector(".phoneInput");
const conatinerContacts = document.querySelector(".contcat-conatiner-list");
const btnAllDel = document.querySelector('.delete-all');
const resetBtn = document.querySelector('.BtnremoveContat')

const html = new HTMLUI(inputName, inputEmail, phoneNumber);

//evemtListner
addEventListner();

function addEventListner() {
    btnAddContact.addEventListener("click", addContact);
    inputName.addEventListener("blur", checkElInput);
    inputEmail.addEventListener("blur", checkElInput);
    phoneNumber.addEventListener("blur", checkElInput);
    document.addEventListener("DOMContentLoaded", loadData);
    conatinerContacts.addEventListener("click", deleteContacts);
    btnAllDel.addEventListener('click', deleteAll);
    resetBtn.addEventListener('click', cancelAdd)

}

//function
function addContact() {
    //Execute the function that the user entered the fields correctly?
    const chek = html.checkFileds();

    if (chek === true) {
        const informationContact = new infoContact(html);

        //Check local storage
        informationContact.checkLocalStorage();

        //Save contact information
        informationContact.saveInfoContact();

        //Create elements for each contact
        html.createElementContact();
    }
}

//Check the elements when blur occurs
function checkElInput() {
    const element = this;

    html.checkElementInput(element);
}

function loadData() {
    //Load elements to display contact information
    html.loadElemntInfo();
}

function deleteAll() {

    const informationContact = new infoContact(html);

    informationContact.deleteAllContact();
}

//Delete contacts
function deleteContacts(e) {
    if (e.target.classList.contains("btn-del")) {

        const InfoContact = [
            e.target.parentElement.parentElement.children[0].children[1].textContent,
            e.target.parentElement.parentElement.children[1].children[1].textContent,
            e.target.parentElement.parentElement.children[2].children[1].textContent,
            e.target.parentElement.parentElement.children[3].children[1].textContent,

        ];

        const informationContact = new infoContact(html);

        //Send user information to delete user
        informationContact.deleteContact(InfoContact);

    }
}

//Cancel save contact
function cancelAdd() {

    html.resetInput()

}