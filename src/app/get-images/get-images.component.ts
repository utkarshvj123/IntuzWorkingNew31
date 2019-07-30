import { Component,OnInit,} from '@angular/core';
import { ImagesService} from '../images.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-get-images',
  templateUrl: './get-images.component.html',
  styleUrls: ['./get-images.component.css']
})
export class GetImagesComponent implements OnInit {

  search: any;
  constructor(private service: ImagesService) {}
  ngOnInit() {
      this.gettingTotal = 0;
  }

  page: number = 0;
  loader: boolean = false;
  newImage: any;
  imageUrl: any;
  displayPagination = false;
  displayLazyLoading = false;
  gettingTotal: any;

  searchDisplay = false;
  // pagination=false;
  // lazy_loading=false;
  addValueDisplay = true;
  currentValue: any;

  //--------Checking what is clicked by user-------//
  getClickedAnchor(value) {
      console.log(value);
      if (value == 0) {
          // this.pagination=true;
          this.page = 1;
          this.currentValue = 'pagination';
          this.searchDisplay = true;
          this.addValueDisplay = false;
      } else {
          this.page = 10;
          this.searchDisplay = true;
          this.addValueDisplay = false;
          this.currentValue = 'lazy_loading';
      }
  }
  noImage: boolean;
  //-----------Getting search param----------//
  getSearchQuery(page) {
      console.log(this.currentValue, "Current value printing")
      console.log(this.page);
      if (this.currentValue === 'pagination') {
          this.displayPagination = true;
          this.displayLazyLoading = false;
          this.loader = true;
          console.log(this.search, "See sarch query");
          this.service.getDetails(this.search, page).subscribe((response) => {
              console.log(response);
              this.imageUrl = response;
              console.log(this.imageUrl)
              this.gettingTotal = this.imageUrl.total;
              this.newImage = this.imageUrl.results;
              console.log(this.newImage)
              this.loader = false;
              this.noImage = false
              if (this.newImage.length == 0) {
                  console.log("No Images");
                  this.noImage = true
              } else {
                  console.log("Getting values")
              }
          })

      } else {
          this.displayPagination = false;
          this.displayLazyLoading = true;
          //this.loader=true;
          console.log(this.currentValue);
          this.service.getImagesPerPages(this.search, page).subscribe((response) => {
              console.log(response);
              this.imageUrl = response;
              console.log(this.imageUrl)
              this.gettingTotal = this.imageUrl.total;
              this.newImage = this.imageUrl.results;
              console.log(this.newImage)
              this.noImage = false;
              if (this.newImage.length == 0) {
                  console.log("No Images");
                  this.noImage = true
              } else {
                  console.log("Getting values")
              }
              //this.loader=false;
          })

      }




  }

  //--------Pagination value----------//
  pageChanged(event) {
      this.page = event;
      console.log(event);
      this.getSearchQuery(event);
  }



  perViewImagesLoaded(event) {
      this.page = this.page + 10;
      console.log(this.page);
      this.getSearchQuery(this.page);
  }



  gettingSelectedImage(value) {
      console.log(value);
      Swal.fire({
          imageUrl: value,
          background: "transparent",
          imageAlt: 'Custom image',
          animation: false,
          showConfirmButton: false
      })
  }
}
