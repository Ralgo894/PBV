(function() {
    let fav = [];
    let viewData = [];

    const imageLoadLimit = 20;
    let imageLoadCount = 0;

    const columnCount = 3;
    const gridContainer = document.body;

    const getImageUrl = (e=null, i=0) => {
        let path;
        if (e == null) {
            path = "img/" + fav[i].image_urls.large.match(/.*\/(.+)$/)[1];
        }
        else {
            path = "img/" + e.image_urls.large.match(/.*\/(.+)$/)[1];
        }
        return path;
    };

    const number2Alphabet = (num) => {
        const numList = ('' + num).split('');
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        return numList.map(e => alphabet.charAt(e)).join('');
    };

    const arr2TemplateAreas = (arr) => {
        let str = '';
        arr.forEach(row => {
            str += '"' + row.join(' ') + '" ';
        });
        return str;
    }

    let imgMap = [new Array(columnCount).fill('.'),new Array(columnCount).fill('.')];
    let rowIndex = 0;
    let columnIndex = 0;
    let insertBeforePointQueue = [];
    let insertBeforeElementQueue = [];
    const addImages = () => {
        const loadingData = viewData.slice(imageLoadCount*imageLoadLimit, imageLoadCount*imageLoadLimit + imageLoadLimit);
        // console.log(loadingData);
        imageLoadCount++;
        loadingData.forEach((e, i) => {
            const imgContainer = document.createElement('a');
            imgContainer.style.display = 'block';
            imgContainer.href = 'https://www.pixiv.net/artworks/' + e.id;
            imgContainer.target = '_blank';
            imgContainer.classList.add('imgContainer');

            if (window.location.host == 'www.pixiv.net') {
                imgContainer.style.backgroundImage = `url("${e.image_urls.large}")`;
            }
            else {
                imgContainer.style.backgroundImage = `url("${getImageUrl(e)}")`;
            }

            // imgContainer.textContent = i;


            // add class
            const w_h = calcAspectRatio(e);
            let cls = '';
            if (w_h > 1.36) {
                cls = 'w2h1';
                imgContainer.style.gridArea = number2Alphabet(e.id);
                imgContainer.classList.add('w2h1');
            }
            else if (w_h < 0.66) {
                cls = 'w1h2';
                imgContainer.style.gridArea = number2Alphabet(e.id);
                imgContainer.classList.add('w1h2');
            }

            // appendChild
            gridContainer.appendChild(imgContainer);


            // next row
            const addRow = () => {
                imgMap.push(new Array(columnCount).fill('.'));
                rowIndex += 1;
                columnIndex = 0
            }
            if (columnIndex >= columnCount) {
                addRow();
            }

            if (imgMap[rowIndex][columnIndex] != '.') {
                while (true) {
                    if (columnIndex >= columnCount-1) {
                        addRow();
                    }
                    else {
                        columnIndex++;
                    }

                    if (imgMap[rowIndex][columnIndex] == '.') {
                        break;
                    }
                }
            }

            // set image map data
            if (cls == 'w2h1') {
                imgMap[rowIndex][columnIndex] = number2Alphabet(e.id);
                if (columnIndex >= columnCount-1 || imgMap[rowIndex][columnIndex+1] != '.') {
                    imgMap[rowIndex][columnIndex] = '.';

                    if (columnIndex >= columnCount) addRow();
                    while(true) {
                        if (imgMap[rowIndex][columnIndex] == '.' && imgMap[rowIndex][columnIndex+1] == '.' && columnIndex+1 != columnCount) {
                            imgMap[rowIndex][columnIndex] = number2Alphabet(e.id);
                            // insertBeforePointQueue.pop();
                            // insertBeforeElementQueue.pop();
                            break;
                        }

                        if (imgMap[rowIndex][columnIndex] == '.') {
                            insertBeforePointQueue.push([rowIndex, columnIndex]);
                        }
                        else {
                            insertBeforePointQueue.push([rowIndex, columnIndex+1]);
                        }
                        insertBeforeElementQueue.push(imgContainer);


                        columnIndex++;
                        // next row
                        if (columnIndex+1 >= columnCount) {
                            addRow();
                        }
                    }
                }

                imgMap[rowIndex][++columnIndex] = number2Alphabet(e.id);
            }
            else if (cls == 'w1h2') {
                imgMap[rowIndex][columnIndex] = number2Alphabet(e.id);
                imgMap[rowIndex+1][columnIndex] = number2Alphabet(e.id);
            }
            else if (insertBeforeElementQueue.length != 0) {
                // console.log(insertBeforePointQueue);

                imgMap[rowIndex][columnIndex] = '.';
                columnIndex--;

                // gridContainer.insertBefore(imgContainer, insertBeforeElementQueue.shift());
                insertBeforeElementQueue.shift();

                // const insertBeforePoint = insertBeforePointQueue.shift();
                insertBeforePointQueue.shift();
                // imgMap[insertBeforePoint[0]][insertBeforePoint[1]] = number2Alphabet(e.id);
            }
            columnIndex++;

            // console.log(insertBeforePointQueue);
        });

        // console.table(imgMap);

        const gridTemplateAreas = arr2TemplateAreas(imgMap);
        gridContainer.style.gridTemplateAreas = gridTemplateAreas;
        // console.log(gridTemplateAreas);

        // return imgMap;
    };

    const calcAspectRatio = (e=null, i=0) => {
        let w, h;
        if (e == null) {
            w = viewData[i].width;
            h = viewData[i].height;
        }
        else {
            w = e.width;
            h = e.height;
        }

        // console.log('w: ' + w + '\nh: ' + h + '\nw / h: ' + (w / h) + '\nh / w: ' + (h / w));

        return w / h;
    }

    const loadFavData = () => {
        return new Promise(resolve => {
            const inputFile = document.createElement('input');
            inputFile.type = "file";

            inputFile.onchange = async () => {
                resolve(JSON.parse(await inputFile.files[0].text()));
            };

            inputFile.click();
        });
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i >= 0; i--) {
            let rand = Math.floor(Math.random() * (i + 1))
            let tmpStorage = array[i]
            array[i] = array[rand]
            array[rand] = tmpStorage
        }
    }

    const searchFavData = (searchStr) => {
        const searchTexts = searchStr.split(/\s/)
        let r = false;

        const resultData = fav.filter((e) => {
            let flag = true;
            searchTexts.forEach(searchText => {
                if (searchText === '-r') {
                    r = true;
                    return;
                }
                flag = flag && e.tags.some((u) => new RegExp(searchText).test(u.name));
            });
            return flag
        });

        if (r) shuffleArray(resultData);

        return resultData;
    }

    let searchStr = '';
    const init = async () => {
        if (fav.length == 0) {
            fav = await loadFavData();
            console.log(fav);
        }


        const s = window.prompt("検索", searchStr);
        if (s) {
            viewData = searchFavData(s);
        }
        else if (s === '') {
            viewData = fav;
        }
        else return
        searchStr = s;
        document.title = s + ` [${viewData.length}]`;

        window.scroll(0, 0);

        document.body.innerHTML = null;
        document.body.setAttribute('class', 'gridContainer');

        const newStyle = document.createElement('style');
        newStyle.textContent = '* {margin: 0;padding: 0;}body {background-color: black;}.gridContainer {--gap: 18px;width: calc(100% - var(--gap)*2);padding: var(--gap);display: grid;grid-template-columns: repeat(6, 1fr);gap: var(--gap);}.imgContainer {--img-height: 560px;height: var(--img-height);font-size: 32px;background-repeat: no-repeat;background-position: center;background-size: cover;grid-row: auto;grid-column: auto;border-radius: 10px;}.w1h2, .w2h2 {height: calc(var(--img-height)*2 + var(--gap));}';
        document.head.appendChild(newStyle);

        gridContainer.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;


        imgMap = [new Array(columnCount).fill('.'), new Array(columnCount).fill('.')];
        rowIndex = 0;
        columnIndex = 0;
        insertBeforePointQueue = [];
        insertBeforeElementQueue = [];
        imageLoadCount = 0;

        addImages();
    }

    
    // document.addEventListener('keydown', e => {
    //     if((e.key === "f" || e.key === "F") && e.shiftKey && e.ctrlKey) {
    //         init();
    //     }
    // });
    init();
    

    window.addEventListener('scroll', () => {
        const bodyHeight = document.body.clientHeight;
        const windowHeight = window.innerHeight;
        const bottomPoint = bodyHeight - windowHeight;

        const currentPos = window.pageYOffset;
        if (bottomPoint <= currentPos + 720) {
            addImages();
        }
    });
})();