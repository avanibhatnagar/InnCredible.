export class Hotel {

  name: string;
  city: string;
  location: string;
  price: string;
  images: URL[];
  rating: string;
  ratingValue: number;
  ratingImg: URL;
  review_num: string;
  hotelID: string;
  description: string;
  roomText: string;
  hotelText: string;
  firstImage: string;
  hotelIndex: string;
  checkIn: string;
  checkOut: string;
  amenities: string[];

  constructor() {}

  setIndex(input_index: string) { this.hotelIndex = input_index; }

  setName(input_name) { this.name = input_name; }

  setCity(input_city) { this.city = input_city; }

  setLocation(input_location) { this.location = input_location; }

  setPrice(input_price) { this.price = input_price; }

  setImages(images) { this.images = images; }

  setRating(input_rating) {
    this.rating = input_rating;
    const temp = input_rating.replace('TripAdvisor vote: ', '');
    const rated = temp.split('/');
    this.ratingValue = rated[0];
  }

  setRatingImg(input_ratingImg) {  this.ratingImg = input_ratingImg; }

  setReviewNum(input_reviewNum) { this.review_num = input_reviewNum; }

  setHotelID(id) { this.hotelID = id; }

  setDescription(hotelDescription){ this.description = hotelDescription; }

  setHotelText(htext) { this.hotelText = htext; }

  setRoomText(rText) { this.roomText = rText; }

  setFirstImage(image) { this.firstImage = image; }

  setCheckIn(checkIN) { this.checkIn = checkIN; }

  setCheckOut(CheckOUT) {this.checkOut = CheckOUT; }

  setAmenities(amen) { this.amenities = amen; }
}
