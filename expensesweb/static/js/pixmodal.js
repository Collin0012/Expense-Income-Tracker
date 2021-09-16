console.log("Hello world js");

document.querySelector('#spinner').style.display = 'block';
const tableBody = document.querySelector('#tablebodybox') 

const modalBody = document.querySelector('#modal__body')

const _url = window.location.origin
console.log(_url)

$.ajax({
    type: "GET",
    url: "/pixmodal/data-json/",
    success: function(response){
        console.log(response)
        const data = JSON.parse(response.data)
        console.log(data)
        data.forEach(el=>{
            console.log(el.fields)
            tableBody.innerHTML += `
            <tr>
                <td>${el.pk}</td>
                <td><div class="my_img" data-toggle="modal" data-target="#popup1" data-pic=/media/${el.fields.item}><img src=/media/${el.fields.item} height='40px' class='img-photo'></div></td>
                <td><p class="img__descr">${el.fields.info}</p></td>
            </tr>
        `
        })
        document.querySelector('#spinner').style.display = 'none';

        const imgPhoto = [...document.getElementsByClassName('img-photo')]
        console.log(imgPhoto)

        imgPhoto.forEach(item => item.addEventListener('click', e=> {
            console.log(e.target)
            const pic = e.target.parentElement.getAttribute('data-pic')
            console.log(pic)
            modalBody.innerHTML = `<img src="${pic}" height='250px'>`
        }))

    },
    error: function(error){
        console.log(error)
    }
})