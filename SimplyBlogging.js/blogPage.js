var photoCounter = 0;
var imagesSrc = [];
var images = [];
function previewImages(event){
    if(photoCounter < 4){
    var imageInfo = document.getElementById('imageInfo').files[0].name;
    var elem = document.createElement("img");
    elem.setAttribute("height", "120");
    elem.setAttribute("width", "120");
    elem.setAttribute("alt", "Flower");
    elem.setAttribute("flex", "1")
    elem.id = "photo";
    elem.src = 'images/' + imageInfo;
    imagesSrc.push(elem.src);
    images.push('images/' + imageInfo);
    document.getElementById("image_container").appendChild(elem);
    if(photoCounter == 3){
        document.getElementById('upload').disabled = true;
        document.getElementById('imageInfo').disabled = true;
    }
    this.photoCounter++;
}
}

function reset(){
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    var parent = document.getElementById('image_container')
    while (parent.firstChild) {
        parent.firstChild.remove()
    }
    photoCounter = 0;
    imagesSrc = [];
    images = [];
}

function retrievePosts(){
    var posts = sessionStorage.getItem("posts");
    return JSON.parse(posts);
}

function storeInSession(post) {
    var posts = retrievePosts();
    if(posts){
        posts.push(post)
        sessionStorage.setItem("posts", JSON.stringify(posts));
    } else {
        var posts = [];
        posts.push(post);
        sessionStorage.setItem("posts", JSON.stringify(posts));
    }
}

function readFormData() {
    var posts = retrievePosts();
    var size;
    if(posts){
        size = parseInt(posts.length);        
        console.log(posts.length);
    } else size = 0;

    var post = {}
    post.title = document.getElementById("title").value;
    post.description = document.getElementById('description').value;
    post.images = images;
    post.imagesSrc = imagesSrc;
    post.Id = size++;
    return post; 
}


function createPost(){
    var post = readFormData();
    console.log(post);
    storeInSession(post);
    var right_button = document.createElement('button');
    right_button.innerHTML = '>'
    right_button.classList.add('btn-primary');

    var left_button = document.createElement('button');
    left_button.innerHTML = '<'
    left_button.classList.add('btn-primary');

    var image_container = document.createElement('div');
    image_container.setAttribute("style", 'flex: 1; display: flex;');

    var arrowleft_container = document.createElement('div');
    arrowleft_container.setAttribute("style", 'flex: .5; display: flex; justify-content: center; align-items: center');
    arrowleft_container.appendChild(left_button);

    var arrowright_container = document.createElement('div');
    arrowright_container.setAttribute("style", 'flex: .5; display: flex; justify-content: center; align-items: center');
    arrowright_container.appendChild(right_button);

    var title_description_container = document.createElement('div');
    title_description_container.setAttribute('style', 'flex: 6; display: flex; flex-direction: column; row-gap: 5px;');

    var title = document.createElement('div');
    title.setAttribute('style', 'flex: 1; background-color: white; border: black 1px solid; overflow-y: scroll; height: 164.5px');
    title.innerHTML = post.title;

    var description = document.createElement('div');
    description.setAttribute('style', 'flex: 5; background-color: white; border: black solid 1px; overflow-y: scroll; max-height: 164.5px');
    description.innerHTML = post.description;

    title_description_container.appendChild(title);
    title_description_container.appendChild(description);

    var image = document.createElement("img");
    image.setAttribute("height", "215");
    image.setAttribute("width", "215");
    image.id = `image_${post.Id}`;
    if(images.length > 0)
        image.src = post.images[0];
    else image.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1200px-No_image_3x4.svg.png';
    var container_fluid = document.getElementsByClassName('container-fluid')[0];
    var col = document.createElement('div');
    col.classList.add('col-10');
    col.setAttribute('style', "background-color: seashell; border: black solid 3px; border-radius: 10px; display: flex; flex-direction: row; padding: 10px;");
    var row = document.createElement('div');
    row.classList.add('row');
    row.setAttribute('style', "display : flex; justify-content : center; padding-top: 20px; flex: 2");
    row.id = `post_${post.Id}`;
    container_fluid.appendChild(row);
    row.appendChild(col);
    col.appendChild(arrowleft_container);
    col.appendChild(image_container);
    col.appendChild(arrowright_container);
    col.appendChild(title_description_container);
    image_container.appendChild(image);
    right_button.onclick = () => {
        var imageSrc = document.getElementById(`image_${post.Id}`).src;
        console.log(imageSrc);
        var image = document.getElementById(`image_${post.Id}`);
        console.log(image);
        for(let i = 0; i < post.images.length-1; i++){
            if(post.imagesSrc[i] == imageSrc){
                console.log('hello');
                console.log(post.images[i])
                console.log(post.imagesSrc[i+1]);
                image.src = post.images[i+1];
                break;
            }
        }
    };
    left_button.onclick = () => {
        var imageSrc = document.getElementById(`image_${post.Id}`).src;
        console.log(imageSrc);
        var image = document.getElementById(`image_${post.Id}`);
        console.log(image);
        for(let i = post.images.length-1; i > 0; i--){
            if(post.imagesSrc[i] == imageSrc){
                console.log('hello');
                console.log(post.images[i])
                console.log(post.imagesSrc[i-1]);
                image.src = post.images[i-1];
                break;
            }
        }
    };
    reset();
}

function right_button(){
    console.log('hello');
}

function getPosts(){
    var posts = retrievePosts();
    posts.forEach((post) => {
        loadPosts(post);
    })
}

function loadPosts(){
    var posts = retrievePosts();
    if(posts){
        posts.forEach((post)=>{
            var right_button = document.createElement('button');
            right_button.innerHTML = '>'
            right_button.classList.add('btn-primary');
        
            var left_button = document.createElement('button');
            left_button.innerHTML = '<'
            left_button.classList.add('btn-primary');
        
            var image_container = document.createElement('div');
            image_container.setAttribute("style", 'flex: 1; display: flex;');
        
            var arrowleft_container = document.createElement('div');
            arrowleft_container.setAttribute("style", 'flex: .5; display: flex; justify-content: center; align-items: center');
            arrowleft_container.appendChild(left_button);
        
            var arrowright_container = document.createElement('div');
            arrowright_container.setAttribute("style", 'flex: .5; display: flex; justify-content: center; align-items: center');
            arrowright_container.appendChild(right_button);
        
            var title_description_container = document.createElement('div');
            title_description_container.setAttribute('style', 'flex: 6; display: flex; flex-direction: column; row-gap: 5px;');
        
            var title = document.createElement('div');
            title.setAttribute('style', 'flex: 1; background-color: white; border: black 1px solid; overflow-y: scroll; height: 164.5px');
            title.innerHTML = post.title;
        
            var description = document.createElement('div');
            description.setAttribute('style', 'flex: 5; background-color: white; border: black solid 1px; overflow-y: scroll; max-height: 164.5px');
            description.innerHTML = post.description;
        
            title_description_container.appendChild(title);
            title_description_container.appendChild(description);
        
            var image = document.createElement("img");
            image.setAttribute("height", "215");
            image.setAttribute("width", "215");
            image.id = `image_${post.Id}`;
            if(post.images.length > 0)
                image.src = post.images[0];
            else image.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1200px-No_image_3x4.svg.png';
            var container_fluid = document.getElementsByClassName('container-fluid')[0];
            var col = document.createElement('div');
            col.classList.add('col-10');
            col.setAttribute('style', "background-color: seashell; border: black solid 3px; border-radius: 10px; display: flex; flex-direction: row; padding: 10px;");
            var row = document.createElement('div');
            row.classList.add('row');
            row.setAttribute('style', "display : flex; justify-content : center; padding-top: 20px; flex: 2");
            row.id = `post_${post.Id}`;
            container_fluid.appendChild(row);
            row.appendChild(col);
            col.appendChild(arrowleft_container);
            col.appendChild(image_container);
            col.appendChild(arrowright_container);
            col.appendChild(title_description_container);
            image_container.appendChild(image);
            right_button.onclick = () => {
                var imageSrc = document.getElementById(`image_${post.Id}`).src;
                console.log(imageSrc);
                var image = document.getElementById(`image_${post.Id}`);
                console.log(image);
                for(let i = 0; i < post.images.length-1; i++){
                    if(post.imagesSrc[i] == imageSrc){
                        image.src = post.images[i+1];
                        break;
                    }
                }
            };
            left_button.onclick = () => {
                var imageSrc = document.getElementById(`image_${post.Id}`).src;
                console.log(imageSrc);
                var image = document.getElementById(`image_${post.Id}`);
                console.log(image);
                for(let i = post.images.length-1; i > 0; i--){
                    if(post.imagesSrc[i] == imageSrc){
                        image.src = post.images[i-1];
                        break;
                    }
                }
            };

        })
    }   
}