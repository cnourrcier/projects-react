import Accordion from '../accordion/index';;
import RandomColorGenerator from '../randomColorGenerator/index';
import StarRating from '../starRating/index';
import ImageSlider from '../imageSlider/index';
import LoadMoreProducts from '../loadMoreProducts/index';
import TreeView from '../treeView/index';
import menus from '../treeView/data';
import LightDarkMode from '../lightDarkMode/index';

const tabs = [
    {
        label: 'Accordion',
        content: <Accordion />
    },
    {
        label: 'Random Color Generator',
        content: <RandomColorGenerator />
    },
    {
        label: 'Star Rating',
        content: <StarRating starCount={10} />
    },
    {
        label: 'Image Slider',
        content: <ImageSlider
            url={'https://picsum.photos/v2/list'}
            page={'1'}
            limit={'10'}
        />
    },
    {
        label: 'Load More Products',
        content: <LoadMoreProducts url={'https://dummyjson.com/products'} limit={20} />
    },
    {
        label: 'Tree View',
        content: <TreeView list={menus} />
    },
    {
        label: 'Theme Switch',
        content: <LightDarkMode />
    },
]

export default tabs;