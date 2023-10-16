import menu from '../html/menu.html?raw'

const renderMenu = (actualPage) =>
{
    document.querySelector('header').innerHTML = menu
    changeMenuColor(actualPage)
}

const changeMenuColor = (actualPage) =>
{
    document.querySelector(`#menu-${actualPage} a`).classList.remove("text-white")
    document.querySelector(`#menu-${actualPage} a`).classList.add("text-secondary")
}

export {renderMenu}