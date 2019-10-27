let result = [];
let company;

let tbody = document.querySelector("tbody");

fetch("http://localhost:3000/companies")
  .then(res => {
    return res.json();
  })
  .then(res => {
    res.forEach(companiesObject => {
      result[companiesObject.name] = [];

      fetch("http://localhost:3000/users")
        .then(res => {
          return res.json();
        })
        .then(res => {
          let tr = document.createElement("tr");
          let td1 = document.createElement("td");
          let td3 = document.createElement("td")
          // try insert here sort
          td1.append(companiesObject.name);
          tr.append(td1);
          res.forEach(userObject => {
            if (companiesObject.uri === userObject.uris.company) {
              result[companiesObject.name].push({
                name: userObject.name,
                email: userObject.email
              });
              result = result.sort((a, b) => a.length - b.length);

              let p = document.createElement('p');
              p.append(userObject.name + ' ' + userObject.email)
              td3.append(p)
            }
          }); // forEach end
          let td2 = document.createElement("td");
            td2.append(result[companiesObject.name].length);

            tr.append(td2, td3);
            tbody.append(tr);
          // add company name and maybe number of workers
          //result[companiesObject.name].push()
        });
    });
    // all foreachs ends here
    result = result.sort((a, b) => a.length - b.length);
    console.log(result);
    result.forEach(company => {
      console.log(company);
      let tr = document.createElement("tr");

      Object.keys(result).forEach(companyName => {
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");

        td1.append(companyName);
        td2.append(company.length);

        tr.append(td1);
        tr.append(td2);
        tbody.append(tr);
      });
    });
  });
//   .then(res => {
//     result = result.sort((a, b) => a.length - b.length);
//     result.forEach(company => {
//       let tr = document.createElement("tr");

//       Object.keys(result).forEach(companyName => {
//         let td1 = document.createElement("td");
//         let td2 = document.createElement("td");

//         td1.append(companyName);
//         td2.append(company.length);

//         tr.append(td1);
//         tr.append(td2);
//         tbody.append(tr);
//       });
//     });
//   });

// 1 foreach companies. inside of companies foreach foreach users.
// 2 make counter and check companies.uri with users.uris.company
// 3 if true add into front-end

/* Some TS tutorials
https://www.youtube.com/watch?v=xPEMup5SPTM
youtube.com/watch?v=zRo2tvQpus8

the best 
https://www.youtube.com/watch?v=I-dml1IDyBc

data table with bootstrap
https://www.youtube.com/watch?v=yGBk9Nalyq8

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
*/
