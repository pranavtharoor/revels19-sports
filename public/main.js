const data = [
  {
    sportName: 'Athletics',
    cost: [{ name: 'Men', value: 3186 }, { name: 'Women', value: 2360 }]
  },
  {
    sportName: 'Badminton',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 7 }, { name: 'Women', size: 4 }],
    cost: [{ name: 'Men', value: 2478 }, { name: 'Women', value: 1180 }]
  },
  {
    sportName: 'Basketball',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 12 }, { name: 'Women', size: 12 }],
    cost: [{ name: 'Men', value: 4248 }, { name: 'Women', value: 3540 }]
  },
  {
    sportName: 'Chess',
    sizeType: 'max',
    teamSize: [{ name: 'Combined', size: 5 }],
    cost: [{ name: 'Combined', value: 1770 }]
  },
  {
    sportName: 'Cricket',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 18 }],
    cost: [{ name: 'Men', value: 6372 }]
  },
  {
    sportName: 'Cross-Country',
    sizeType: 'exact',
    teamSize: [{ name: 'Men', size: 3 }, { name: 'Women', size: 1 }],
    cost: [{ name: 'Men', value: 1062 }, { name: 'Women', value: 295 }]
  },
  {
    sportName: 'Football',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 18 }, { name: 'Women', size: 11 }],
    cost: [{ name: 'Men', value: 6372 }, { name: 'Women', value: 3245 }]
  },
  {
    sportName: 'Hockey',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 16 }],
    cost: [{ name: 'Men', value: 5664 }]
  },
  {
    sportName: 'Squash',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 1 }, { name: 'Women', size: 1 }],
    cost: [{ name: 'Men', value: 354 }, { name: 'Women', value: 295 }]
  },
  {
    sportName: 'Swimming',
    cost: [{ name: 'Men', value: 4602 }, { name: 'Women', value: 3835 }]
  },
  {
    sportName: 'T.T',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 3 }, { name: 'Women', size: 1 }],
    cost: [{ name: 'Men', value: 1062 }, { name: 'Women', value: 295 }]
  },
  {
    sportName: 'Volleyball',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 12 }, { name: 'Women', size: 12 }],
    cost: [{ name: 'Men', value: 4248 }, { name: 'Women', value: 3540 }]
  },
  {
    sportName: 'Handball',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 16 }],
    cost: [{ name: 'Men', value: 5664 }]
  },
  {
    sportName: 'Tennis',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 5 }, { name: 'Women', size: 1 }],
    cost: [{ name: 'Men', value: 1770 }, { name: 'Women', value: 295 }]
  },
  {
    sportName: 'Throwball',
    sizeType: 'max',
    teamSize: [{ name: 'Women', size: 10 }],
    cost: [{ name: 'Women', value: 3245 }]
  }
];

window.onload = () =>
  (document.querySelector('.sports').innerHTML = data.reduce(
    (a, c, sportIndex) =>
      a +
      `<div class="card-container">
        <div class="card sport">
          <div>
            <div class="sport-name">${c.sportName}</div>
            ${
              c.teamSize
                ? `<div class="details">
                    <div>
                    ${
                      c.sizeType === 'max'
                        ? 'Maximum team size'
                        : c.sizeType === 'exact'
                        ? 'Exact team size'
                        : ''
                    }
                    </div>
                    ${c.teamSize.reduce(
                      (a, ts) =>
                        a + `<div><span>${ts.name}:</span>${ts.size}</div>`,
                      ''
                    )}
                  </div>`
                : ''
            }
          </div>
          ${
            c.cost
              ? `<div class="buy">
                ${c.cost.reduce(
                  (a, c) =>
                    a +
                    `<div>
                      <div class="cost">
                        <div>${c.name}</div>
                        <div>₹ ${c.value}</div>
                      </div>
                      <button onclick="openRegistrationForm(${sportIndex}, '${
                      c.name
                    }', '${c.value}')" class="register">register</button>
                    </div>`,
                  ''
                )}
                </div>`
              : ''
          }
        </div>
        <form class="reg-form" onsubmit="return fetchRegister(event)">
        </form>
      </div>`,
    ''
  ));

const regForm = (index, type, cost) => {
  const sizeType = data[index].sizeType;
  let val = 0;
  if (sizeType === 'max' || sizeType === 'exact')
    val = data[index].teamSize.filter(a => a.name === type)[0].size;
  return `
          <div class="form-inputs">
            <div>
              <div class="form-sport">${data[index].sportName}</div>
              <div>
                <div class="form-type">${type}</div>
                <div class="form-cost">₹ ${cost}</div>
              </div>
            </div>
            <div>
              <div class="input-name">College</div>
              <input type="text" name="college" required />
            </div>
            <input type="hidden" name="sport" value="${
              data[index].sportName
            }" />
            <input type="hidden" name="type" value="${type}" />
            ${
              sizeType === 'exact' || val === 1
                ? `
                <div>
                  <div class="input-name">Team size</div>
                  <div class="team-size">${val}</div><input type="hidden" name="teamSize" value="${val}" />
                </div>`
                : sizeType === `max`
                ? `
                <div>
                  <div class="input-name">Team size (max: ${val})</div>
                  <input type="number" max="${val}" min="1" name="teamSize" required />
                <div>`
                : `
                <div>
                  <div class="input-name">Team size</div>
                  <input type="number" min="1" name="teamSize" required />
                </div>`
            }
            <div>
              <div class="input-name">College physical education department's contact number</div>
              <input type="number" name="collegePEContact" required /><br />
            </div>
            <div class="input-name">Contact details of captain and accompanying staff</div>
            <div class="contact-details">
              <button class="add-input-btn" onClick="return addContactInput(event)">+</button>
              <div class="contact-detail">
                <input type="text" name="name" placeholder="Name" required />
                <input type="email" name="email" placeholder="Email" required />
                <input type="number" name="phno" placeholder="Phone number" required />
              </div>
            </div>
            <br />
            <div>
              <div class="input-name">Name</div>
              <input type="text" name="name" required />
            </div>
            <div>
              <div class="input-name">E-mail (for Paytm)</div>
              <input type="email" name="email" required />
            </div>
            <div>
              <div class="input-name">Mobile number (for Paytm)</div>
              <input type="number" name="mobile" required />
            </div>
            <br />
            <div>
              <label class="container">
                <input type="checkbox" name="verifyValidity" required />
                <span class="checkmark"></span>
              </label>&nbsp;I verify that the data I have provided is correct
              <br />
              <label class="container">
                <input type="checkbox" name="acceptTerms" required />
                <span class="checkmark"></span>
              </label>&nbsp;I accept the <a>Terms & Conditions</a>
            </div>
            <!--<div>
              <div class="input-name">Bank account number</div>
              <input type="text" name="bankAccountNumber" required />
            </div>
            <div>
              <div class="input-name">IFSE Code</div>
              <input type="text" name="bankIFSCCode" required />
            </div>
            <div>
              <div class="input-name">Bank name</div>
              <input type="text" name="bankName" required />
            </div>
            <div>
              <div class="input-name">Account type</div>
              <label class="container">
                <input type="radio" name="bankAccountType" value="Savings" required />
                <span class="checkmark"></span>
                &nbsp;Savings
              </label>
              <label class="container">
                <input type="radio" name="bankAccountType" value="Current" required />
                <span class="checkmark"></span>
                &nbsp;Current
              </label>
            </div>-->
            <button class="register-btn">register</button>
          </div>
`;
};

const contactInput = `
  <div class="contact-detail">
    <input type="text" name="name" placeholder="Name" required />
    <input type="email" name="email" placeholder="Email" required />
    <input type="number" name="phno" placeholder="Phone number" required />
    <button onClick="return deleteContactInput(this, event)"/>&times;</button>
  </div>
`;

function addContactInput(e) {
  e.preventDefault();
  document
    .querySelector('.contact-details')
    .insertAdjacentHTML('beforeend', contactInput);
  return false;
}

function deleteContactInput(el, e) {
  e.preventDefault();
  el.parentElement.outerHTML = '';
  return false;
}

function fetchRegister(e) {
  e.preventDefault();
  const formData = [...document.querySelectorAll('.form-inputs input')]
    .filter(el => ![...el.parentElement.classList].includes('contact-detail'))
    .reduce(
      (a, c) => ({
        ...a,
        ...(c.type === 'radio' && !c.checked ? {} : { [c.name]: c.value })
      }),
      {}
    );
  const contact = [...document.querySelectorAll('.contact-detail')].reduce(
    (a, c) => [
      ...a,
      [...c.childNodes].reduce(
        (a, c) => ({ ...a, ...(c.name ? { [c.name]: c.value } : {}) }),
        {}
      )
    ],
    []
  );
  console.log({ ...formData, contact });
  fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData, contact })
  })
    .then(resp => resp.json())
    .then(data => {
      if (!data.success) alert('Error');
      else window.location.href = data.data.redirect;
    });
}

function openRegistrationForm(sportIndex, type, cost) {
  const form = document.querySelectorAll('.reg-form')[sportIndex];
  [...document.querySelectorAll('.reg-form')].forEach(form => {
    form.style.height = '0px';
    form.innerHTML = '';
  });
  form.style.height = '980px';
  document.querySelectorAll('.card-container')[sportIndex].scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
  form.innerHTML = regForm(sportIndex, type, cost);
}

function submitForm(e) {
  e.preventDefault();
  return false;
}
