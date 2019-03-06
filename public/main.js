const data = [
  {
    sportName: 'Athletics',
    venue: 'MIT Cricket/Athletics ground',
    cost: [{ name: 'Men', value: '3,300' }, { name: 'Women', value: '2,500' }],
    prize: [
      { name: 'Men', value: ['16,000', '8,000'] },
      { name: 'Women', value: ['9,500', '4,750'] }
    ],
    date: '6<sup>th</sup> March 06:00 to 9<sup>th</sup> March'
  },
  {
    sportName: 'Badminton',
    venue: 'Recreational Center',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 7 }, { name: 'Women', size: 4 }],
    cost: [{ name: 'Men', value: '2,600' }, { name: 'Women', value: '1,300' }],
    prize: [
      { name: 'Men', value: ['11,000', '5,500'] },
      { name: 'Women', value: ['6,000', '3,000'] }
    ],
    date: '6<sup>th</sup> March 14:00 to 7<sup>th</sup> March'
  },
  {
    sportName: 'Basketball',
    venue: 'MIT Basketball Court (Block 13)',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 12 }, { name: 'Women', size: 12 }],
    cost: [{ name: 'Men', value: '4,400' }, { name: 'Women', value: '3,700' }],
    prize: [
      { name: 'Men', value: ['32,000', '16,000'] },
      { name: 'Women', value: ['18,000', '9,000'] }
    ],
    date: '6<sup>th</sup> March 17:00 to 9<sup>th</sup> March'
  },
  {
    sportName: 'Chess',
    venue: 'Academic Block-5',
    sizeType: 'max',
    teamSize: [{ name: 'Combined', size: 5 }],
    cost: [{ name: 'Combined', value: '1,800' }],
    prize: [{ name: 'Combined', value: ['10,000', '5,000'] }],
    date: '6<sup>th</sup> March 17:00 to 8<sup>th</sup> March'
  },
  {
    sportName: 'Cricket',
    venue: 'MIT Cricket/Athletics ground',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 18 }],
    cost: [{ name: 'Men', value: '6,600' }],
    prize: [{ name: 'Men', value: ['36,000', '18,000'] }],
    date: '4<sup>th</sup> March 09:00 to 9<sup>th</sup> March'
  },
  {
    sportName: 'Cross-Country',
    venue: 'MIT Athletic ground',
    sizeType: 'exact',
    teamSize: [{ name: 'Men', size: 3 }, { name: 'Women', size: 1 }],
    cost: [{ name: 'Men', value: '1,100' }, { name: 'Women', value: '300' }],
    prize: [
      { name: 'Men', value: ['4,500', '2,250'] },
      { name: 'Women', value: ['2,500', '1,250'] }
    ],
    date: '8<sup>th</sup> March 06:00 to 8<sup>th</sup> March'
  },
  {
    sportName: 'Football',
    venue: 'MIT Football Ground/End Point ',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 18 }, { name: 'Women', size: 11 }],
    cost: [{ name: 'Men', value: '6,600' }, { name: 'Women', value: '3,400' }],
    prize: [
      { name: 'Men', value: ['60,000', '30,000'] },
      { name: 'Women', value: ['12,000', '6,000'] }
    ],
    date: '4<sup>th</sup> March 07:00 to 9<sup>th</sup> March'
  },
  {
    sportName: 'Handball',
    venue: 'MIT Handball Ground (Above Football ground)',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 16 }],
    cost: [{ name: 'Men', value: '5,900' }],
    prize: [{ name: 'Men', value: ['19,000', '9,500'] }],
    date: '6<sup>th</sup> March 16:00 to 9<sup>th</sup> March'
  },
  {
    sportName: 'Hockey',
    venue: 'MIT Hockey Ground',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 16 }],
    cost: [{ name: 'Men', value: '5,900' }],
    prize: [{ name: 'Men', value: ['42,000', '21,000'] }],
    date: '4<sup>th</sup> March 08:00 to 9<sup>th</sup> March'
  },
  {
    sportName: 'Tennis',
    venue: 'MIT Tennis Court , Recreation Center',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 5 }, { name: 'Women', size: 1 }],
    cost: [{ name: 'Men', value: '1,900' }, { name: 'Women', value: '300' }],
    prize: [
      { name: 'Men', value: ['12,000', '6,000'] },
      { name: 'Women', value: ['2,500', '1,250'] }
    ],
    date: '6<sup>th</sup> March 08:00 to 9<sup>th</sup> March'
  },
  {
    sportName: 'Squash',
    venue: 'Marena Sports complex',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 1 }, { name: 'Women', size: 1 }],
    cost: [{ name: 'Men', value: '370' }, { name: 'Women', value: '300' }],
    prize: [
      { name: 'Men', value: ['3,000', '1,500'] },
      { name: 'Women', value: ['2,500', '1,250'] }
    ],
    date: '6<sup>th</sup> March 13:00 to 9<sup>th</sup> March'
  },
  {
    sportName: 'Swimming',
    venue: 'MIT Swimming Pool',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 1 }, { name: 'Women', size: 1 }],
    cost: [{ name: 'Men', value: '500' }, { name: 'Women', value: '500' }],
    prize: [
      { name: 'Men', value: ['24,000', '12,000'] },
      { name: 'Women', value: ['12,000', '6,000'] }
    ],
    date: '6<sup>th</sup> March 08:00 to 9<sup>th</sup> March'
  },
  {
    sportName: 'Table Tennis',
    venue: 'Recreational Center',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 4 }, { name: 'Women', size: 1 }],
    cost: [{ name: 'Men', value: '1,100' }, { name: 'Women', value: '300' }],
    prize: [
      { name: 'Men', value: ['10,000', '5,000'] },
      { name: 'Women', value: ['7,000', '3,500'] }
    ],
    date: '8<sup>th</sup> March 16:00 to 9<sup>th</sup> March'
  },
  {
    sportName: 'Volleyball',
    venue: 'MIT GROUND',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 12 }, { name: 'Women', size: 12 }],
    cost: [{ name: 'Men', value: '4,400' }, { name: 'Women', value: '3,700' }],
    prize: [
      { name: 'Men', value: ['15,000', '7,500'] },
      { name: 'Women', value: ['10,000', '5,000'] }
    ],
    date: '7<sup>th</sup> March 08:00 to 9<sup>th</sup> March'
  },
  {
    sportName: 'Throwball',
    venue: 'MIT GROUND',
    sizeType: 'max',
    teamSize: [{ name: 'Women', size: 10 }],
    cost: [{ name: 'Women', value: '3,700' }],
    prize: [{ name: 'Women', value: ['12,000', '6,000'] }],
    date: '6<sup>th</sup> March 08:00 to 6<sup>th</sup> March'
  }
];

const referral = new URL(location.href).searchParams.get('referral');

let full = null;

window.onload = () => {
  fetch('/api/init')
    .then(resp => resp.json())
    .then(respData => {
      full = respData.data;
      populate();
    });
};

const populate = () =>
  (document.querySelector('.sports').innerHTML = data.reduce(
    (a, c, sportIndex) =>
      a +
      `<div class="card-container">
        <div class="card sport">
          <div class="sport-detail">
            <div class="sport-name">${c.sportName}</div>
            <div class="sport-date">${c.date}</div>
            <div class="sport-date">${c.venue}</div>
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
          ${
            c.prize
              ? `<div class="details prize">
                  <div>Prize money (1<sup>st</sup>, 2<sup>nd</sup>)</div>
                  ${c.prize.reduce(
                    (a, p) =>
                      a +
                      `
                        <div class="prize-money">
                          <div class="prize-name">${p.name}</div>
                          <div class="prize-values">
                            ${p.value.map(val => `&nbsp;₹<div>${val}</div>`)}
                          </div>
                        </div>
                      `,
                    ''
                  )}
                </div>`
              : ''
          }
        </div>
        <form class="reg-form" onsubmit="return submitForm(event)">
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
            ${
              referral
                ? `<input type="hidden" value="${referral}" name="referral" />`
                : `<div>
                <div class="input-name">Referral Code (if any)</div>
                <input type="text" name="referral" />
              </div>`
            }
            <br />
            <div>
              <label class="container">
                <input id="mahe-checkbox" type="checkbox" name="mahe" />
                <span class="checkmark"></span>
              </label>&nbsp;I am from a MAHE college
              <br />
              <label class="container">
                <input type="checkbox" name="techCollege" required />
                <span class="checkmark"></span>
              </label>&nbsp;I verify that I am from a technical institute
              <br />
              <label class="container">
                <input type="checkbox" name="verifyValidity" required />
                <span class="checkmark"></span>
              </label>&nbsp;I verify that the data I have provided is correct
              <br />
              <label class="container">
                <input type="checkbox" name="acceptTerms" required />
                <span class="checkmark"></span>
              </label>&nbsp;I accept the <a href="/tnc.pdf" target="_blank">Terms & Conditions</a>
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
            <button id="submit" class="register-btn">register</button>
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

function fetchRegister(token) {
  const formData = [
    ...document.querySelectorAll('.form-inputs input:not([type=checkbox])')
  ]
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
  if (
    // document.querySelector('#mahe-checkbox').checked &&
    // formData.sport === 'Cricket' ||
    !(
      formData.sport === 'Swimming' ||
      formData.sport === 'Athletics' ||
      formData.sport === 'Chess' ||
      formData.sport === 'Throwball' ||
      (formData.sport === 'Basketball' && formData.type === 'Men') ||
      // (formData.sport === 'Tennis' && formData.type === 'Women') ||
      (formData.sport === 'Table Tennis' && formData.type === 'Men') ||
      (formData.sport === 'Badminton' && formData.type === 'Women')
    ) //||
    // (formData.sport === 'Hockey' && formData.type === 'Men') //||
    // (formData.sport === 'Football' && formData.type === 'Men')
  ) {
    grecaptcha.reset();
    snackbar('Registrations full for this sport', false);
    return;
  }
  let valid = true;
  [...document.querySelectorAll('input')].forEach(el => {
    if (!el.checkValidity()) {
      el.style.border = 'solid thin red';
      valid = false;
    }
    if (!el.checkValidity() && el.type === 'checkbox')
      snackbar('Verify data, technical institute and accept T&C please', false);
  });
  grecaptcha.reset();
  if (!valid) return;
  fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...formData,
      contact,
      'g-recaptcha-response': token
    })
  })
    .then(resp => resp.json())
    .then(data => {
      if (!data.success) snackbar('Could not register', false);
      else window.location.href = data.data.redirect;
    });
}

function openRegistrationForm(sportIndex, type, cost) {
  if (
    full.filter(a => a.sport === data[sportIndex].sportName && a.type === type)
      .length > 0
  )
    return snackbar('Sorry, registrations full', false);

  const form = document.querySelectorAll('.reg-form')[sportIndex];
  [...document.querySelectorAll('.reg-form')].forEach(form => {
    form.style.height = '0px';
    form.innerHTML = '';
  });
  form.style.height = '1060px';
  document.querySelectorAll('.card-container')[sportIndex].scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
  form.innerHTML = regForm(sportIndex, type, cost);
  grecaptcha.render('submit', {
    sitekey: '6Lf_MocUAAAAADAgZxykFBkb_DNw_ShFzLs-kyrB',
    callback: fetchRegister
  });
}

function submitForm(e) {
  e.preventDefault();
  return false;
}

function snackbar(content, success = true) {
  document.querySelector('#snackbar').innerHTML = content;
  document.querySelector('#snackbar').classList.add('open');
  document
    .querySelector('#snackbar')
    .classList.add(success ? 'success' : 'danger');
  setTimeout(() => {
    document.querySelector('#snackbar').classList.remove('open');
  }, 4000);
}
