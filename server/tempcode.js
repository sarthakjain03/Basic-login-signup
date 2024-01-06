function readAndWriteData(data) {
    // fs.readFile('./userdata.json', 'utf-8', function (err, userData) {
    //     if (err) {
    //         console.log(err);
    //         res.status(500).json("error");
    //         return;
    //     }
    //     var newData = JSON.parse(userData);
    //     var storedData = {}
    //     for (const obj of newData) {
    //         if (obj.email === userEmail) {
    //             storedData = obj
    //             break;
    //         }
    //     }

    //     res.status(200).json(storedData)
    // });

    // fs.readFile('./userdata.json', 'utf-8', function (err, userData) {
    //     if (err) {
    //         console.log(err);
    //         res.status(500).json("error");
    //         return;
    //     }
    //     let check1 = 0, check2 = 0;
    //     var newData = JSON.parse(userData);
        
    //     for (const obj of newData) {
    //         if (obj.email === email) {
    //             check1 = 1;
    //             if(obj.password === password)
    //                 check2 = 1;
    //             break;
    //         }
    //     }

    //     if (check1 === 1 && check2 === 1) {
    //         // code for jwt auth
    //         const currUser = {email: email}
    //         const accessToken = jwt.sign(currUser, process.env.ACCESS_TOKEN_SECRET)
    //         res.status(200).json({accessToken: accessToken});

    //     } else if(check1 === 1) {
    //         res.status(200).json("invalidpass")
    //     } else {
    //         res.status(200).json("notRegistered")
    //     }
    // });

    fs.readFile('./userdata.json', 'utf-8', function (err, userData) {
        if (err) {
            console.log(err);
            res.status(500).json("error reading data");
            return;
        }

        let check = 0;
        var newData = JSON.parse(userData);

        for (const obj of newData) {
            if (obj.email === email) {
                check = 1;
                break;
            }
        }

        if (check === 1) {
            res.status(200).json("Email registered");
        } else {
            newData.push(data);

            fs.writeFile('./userdata.json', JSON.stringify(newData, null, 2), (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).json("error writing data");
                    return;
                }

                res.status(200).json("newuser");
            });
        }
    });
}