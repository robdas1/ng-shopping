/**
 * AvailableProductService
 * 
 * This service provides methods to manage available products.
 * It includes methods to get an available product by id and to get all available products.
 */
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AvailableProduct } from '../models/available-product.interface';


@Injectable({
  providedIn: 'root'
})
export class AvailableProductService {
  // Array of available products
  private availableProducts: AvailableProduct[] = AVAILABLE_PRODUCTS;

  constructor() { }

  // Get an available product by its id.
  getById(id: string): Observable<AvailableProduct | null> {
    const availableProduct = this.availableProducts.find(ap => ap.id === id);
    return of(availableProduct ? availableProduct : null);
  }

  // Get all available products.
  getAll(): Observable<AvailableProduct[]> {
    return of(this.availableProducts);
  }
}

// Array of available product data. Mock data. Later on, this data will be retrieved from a server.
const AVAILABLE_PRODUCTS: AvailableProduct[] = [
  {
    "id": "01",
    "productName": "cuppa",
    "productDetails": "A cup of tea and a bickie. A wonderfully soothing afternoon break.",
    "productImageSource": "https://www.pexels.com/photo/close-up-photography-of-cup-of-coffee-near-biscuits-1143760/",
    "downloadDate": "2023-Oct-03",
    "productImageFile": "https://robidas.github.io/static-site/online-store/fancyacuppa_sm.jpg",
    "unitPrice": 39.99,
  },
  {
    "id": "02",
    "productName": "cucumber",
    "productDetails": "Some people like to eat a cucumber, but you can use it for whatever you want.",
    "productImageSource": "https://www.pexels.com/photo/anonymous-woman-with-facial-mask-and-cucumber-on-eyes-7480084/",
    "downloadDate": "2023-Nov-06",
    "productImageFile": "https://robidas.github.io/static-site/online-store/cucumbers_sm.jpg",
    "unitPrice": 9.71,
  },
  {
    "id": "03",
    "productName": "is potato",
    "productDetails": "Artist's impression of gobble-food. Hungry? ",
    "productImageSource": "https://www.pexels.com/photo/fried-fat-chip-in-fingers-of-person-6697300/",
    "downloadDate": "2023-Oct-03",
    "productImageFile": "https://robidas.github.io/static-site/online-store/ispotato_sm.jpg",
    "unitPrice": 5.20,
  },
  {
    "id": "04",
    "productName": "new shoes",
    "productDetails": "These cool sneakers could be yours. You just have to climb up and get them.",
    "productImageSource": "https://www.pexels.com/photo/hanged-pair-of-black-and-white-converse-all-star-sneakers-3110664/",
    "downloadDate": "2023-Nov-06",
    "productImageFile": "https://robidas.github.io/static-site/online-store/shoes_sm.jpg",
    "unitPrice": 1650.75,
  },
  {
    "id": "05",
    "productName": "dishwasher",
    "productDetails": "Old fashioned dishwasher with self cleaning rinse cycle.",
    "productImageSource": "https://www.pexels.com/photo/crop-woman-washing-dishes-in-kitchen-7262356/",
    "downloadDate": "2023-Oct-03",
    "productImageFile": "https://robidas.github.io/static-site/online-store/dishwasher_sm.jpg",
    "unitPrice": 101.00,
  },
  {
    "id": "06",
    "productName": "guard dog",
    "productDetails": "This vicious guard dog is the ultimate in home defence. But he will eat you out of house and home.",
    "productImageSource": "https://www.pexels.com/photo/gray-and-white-kitten-on-white-bed-2061057/",
    "downloadDate": "2023-Oct-03",
    "productImageFile": "https://robidas.github.io/static-site/online-store/guarddog_sm.jpg",
    "unitPrice": 65.00,
  },
  // {
  //     "id": "07",
  //     "productName": "BFF",
  //     "productDetails": "Mabel wants to be your bff.",
  //     "productImageSource": "https://www.pexels.com/photo/woman-kneeling-on-brown-sand-while-smiling-2101894/",
  //     "downloadDate": "2023-Oct-03",
  //     "productImageFile": "https://robidas.github.io/static-site/online-store/friend_sm.jpg",
  //     "unitPrice": 10.00,
  // },
  {
    "id": "08",
    "productName": "peeled banana",
    "productDetails": "A sweet, yellow partially peeled fruit that you can fully peel as you eat it (the cup of coffee is for size comparison).",
    "productImageSource": "https://www.pexels.com/photo/yellow-banana-on-plate-2872747/",
    "downloadDate": "2023-Oct-03",
    "productImageFile": "https://robidas.github.io/static-site/online-store/bananana_sm.jpg",
    "unitPrice": 25.99,
  },
  {
    "id": "09",
    "productName": "ai",
    "productDetails": "Tired of thinking for yourself?",
    "productImageSource": "https://www.pexels.com/photo/portrait-of-a-humanoid-robot-18799044/",
    "downloadDate": "2023-Nov-03",
    "productImageFile": "https://robidas.github.io/static-site/online-store/AI_sm.jpg",
    "unitPrice": 52.25,
  },
  {
    "id": "10",
    "productName": "poker face",
    "productDetails": "When they ask what you did, act innocent and say nothing.",
    "productImageSource": "https://www.pexels.com/photo/portrait-photo-of-an-adult-black-pug-1851164/",
    "downloadDate": "2023-Oct-26",
    "productImageFile": "https://robidas.github.io/static-site/online-store/straightface_sm.jpg",
    "unitPrice": 16.43,
  },
  {
    "id": "11",
    "productName": "cigar",
    "productDetails": "Sometimes, a cigar is just a cigar. - Sigmund Freud",
    "productImageSource": "https://www.pexels.com/photo/person-holding-lit-cigar-outdoors-15387/",
    "downloadDate": "2023-Oct-28",
    "productImageFile": "https://robidas.github.io/static-site/online-store/cigar_sm.jpg",
    "unitPrice": 270.44,
  },
  {
    "id": "12",
    "productName": "politician",
    "productDetails": "Some politicians are educated far beyond their intelligence.",
    "productImageSource": "https://www.pexels.com/photo/selective-focus-photo-of-brown-monkey-2213575/",
    "downloadDate": "2023-Oct-28",
    "productImageFile": "https://robidas.github.io/static-site/online-store/monkey_sm.jpg",
    "unitPrice": 999.99,
  },
  // {
  //     "id": "13",
  //     "productName": "feelings",
  //     "productDetails": "Go with your feelings. Indulge yourself.",
  //     "productImageSource": "https://www.pexels.com/photo/portrait-of-naked-woman-with-coat-12626693/",
  //     "downloadDate": "2023-Oct-26",
  //     "productImageFile": "https://robidas.github.io/static-site/online-store/naughty_sm.jpg",
  //     "unitPrice": 69.99,
  // },
  {
    "id": "14",
    "productName": "cupcake",
    "productDetails": "Eating this cupcake will satisfy your primal hunger and fill you with sweet bliss.",
    "productImageSource": "https://www.pexels.com/photo/woman-eating-a-customized-cupcake-5702101/",
    "downloadDate": "2023-Nov-03",
    "productImageFile": "https://robidas.github.io/static-site/online-store/cupcake_sm.jpg",
    "unitPrice": 3.25,
  },
  {
    "id": "15",
    "productName": "phone",
    "productDetails": "This state of the art superphone has exactly ten features (0...9) and they all work, all the time. No updates, no charger, no password PIN or fingerprint, and you'll never lose it. It just works.",
    "productImageSource": "https://www.pexels.com/photo/green-telephone-3435213/",
    "downloadDate": "2023-Nov-03",
    "productImageFile": "https://robidas.github.io/static-site/online-store/phone_sm.jpg",
    "unitPrice": 19.95,
  },
  {
    "id": "16",
    "productName": "iApp",
    "productDetails": "The new iApp is full of pixels; and it's cheaper than a phone. Tastes better too.",
    "productImageSource": "https://www.pexels.com/photo/an-apple-with-a-bite-mark-7399830/",
    "downloadDate": "2023-Oct-26",
    "productImageFile": "https://robidas.github.io/static-site/online-store/iapp_sm.jpg",
    "unitPrice": 76.50,

  },
  {
    "id": "17",
    "productName": "this foot",
    "productDetails": "It's always nice to have a spare, just in case.",
    "productImageSource": "https://www.pexels.com/photo/a-person-having-a-foot-massage-6628700/",
    "downloadDate": "2023-Oct-03",
    "productImageFile": "https://robidas.github.io/static-site/online-store/foot_sm.jpg",
    "unitPrice": 12.75,
  },
  {
    "id": "18",
    "productName": "yellow car",
    "productDetails": "Get this famous yellow car from long ago, and feel the nostalgia.",
    "productImageSource": "https://www.pexels.com/photo/yellow-taxi-cab-on-street-3924728/",
    "downloadDate": "2023-Oct-03",
    "productImageFile": "https://robidas.github.io/static-site/online-store/yellowcar_sm.jpg",
    "unitPrice": 16.50,
  },
  {
    "id": "19",
    "productName": "sunset",
    "productDetails": "The morning sun ushers in a new day.",
    "productImageSource": "https://www.pexels.com/photo/scenic-view-of-the-forest-during-sunrise-1006121/",
    "downloadDate": "2023-Oct-28",
    "productImageFile": "https://robidas.github.io/static-site/online-store/sunset_sm.jpg",
    "unitPrice": 0.01,
  },
  {
    "id": "20",
    "productName": "everything",
    "productDetails": "You want the Universe. You want it all. And you want it now.",
    "productImageSource": "https://www.pexels.com/photo/gray-and-black-galaxy-wallpaper-2150/",
    "downloadDate": "2023-Oct-26",
    "productImageFile": "https://robidas.github.io/static-site/online-store/universe_sm.jpg",
    "unitPrice": 2999.99,
  },
  // {
  //     "id": "21",
  //     "productName": "stuff",
  //     "productDetails": "Shopping bags full of the stuff you want.",
  //     "productImageSource": "https://www.pexels.com/photo/person-holding-shopping-bags-5868730/",
  //     "downloadDate": "2023-Nov-05",
  //     "productImageFile": "https://robidas.github.io/static-site/online-store/stuff_sm.jpg",
  //     "unitPrice": 44.99,
  // },
];