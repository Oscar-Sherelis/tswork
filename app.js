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
            let td3 = document.createElement("td");
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
                    p.append(userObject.name + ' ' + userObject.email);
                    td3.append(p);
                }
            }); // forEach end
            let td2 = document.createElement("td");
            td2.append(result[companiesObject.name].length);
            tr.append(td2, td3);
            tbody.append(tr);
        });
    });
});
