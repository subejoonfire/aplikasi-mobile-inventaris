import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular'; // Import ModalController
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    private _api: ApiService,
    private modalController: ModalController
  ) {}

  nama: any;
  jumlah: any;
  barangList: any[] = [];

  modalTerbuka = false;
  barangEdit: any = {
    // Inisialisasi properti barangEdit jika diperlukan
    nama: '',
    jumlah: '',
  };

  ngOnInit() {
    this.tampilBarang();
  }

  tambahBarang() {
    try {
      this._api.tambah({ nama: this.nama, jumlah: this.jumlah }).subscribe(
        (response) => {
          console.log('Response after adding data:', response);
          // Refresh the list after adding data
          this.tampilBarang();
        },
        (error) => {
          console.error('Error adding data:', error);
        }
      );
    } catch (error) {
      console.error('Error in tambahBarang:', error);
    }
  }

  tampilBarang() {
    try {
      this._api.tampil().subscribe(
        (data) => {
          console.log('Data from server:', data);
          this.barangList = data;
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    } catch (error) {
      console.error('Error in tampilBarang:', error);
    }
  }

  hapusBarang(id: string) {
    try {
      this._api.hapus(id).subscribe(
        () => {
          console.log('Data deleted successfully');
          this.tampilBarang();
        },
        (error) => {
          console.error('Error deleting data:', error);
        }
      );
    } catch (error) {
      console.error('Error in hapusBarang:', error);
    }
  }

  async editBarang(barang: any) {
    this.barangEdit = { ...barang }; // Menggunakan spread operator untuk menghindari pengaruh langsung pada data asli
    this.modalTerbuka = true; // Mengatur variabel modalTerbuka menjadi true
    const modal = await this.modalController.create({
      component: 'ion-modal',
      cssClass: 'my-custom-class',
      componentProps: {
        isOpen: this.modalTerbuka,
        barangEdit: this.barangEdit,
      },
    });

    modal.onWillDismiss().then((result) => {
      this.modalTerbuka = false; // Mengatur variabel modalTerbuka menjadi false saat modal ditutup
      if (result.data) {
        console.log('Data after editing:', result.data);
        // Refresh the list after editing data
        this.tampilBarang();
      }
    });

    return await modal.present();
  }

  cancel() {
    this.modalTerbuka = false; // Mengatur variabel modalTerbuka menjadi false saat modal dibatalkan
    this.modalController.dismiss();
  }

  onWillDismiss(event: any) {
    this.modalTerbuka = false; // Mengatur variabel modalTerbuka menjadi false saat modal akan ditutup
  }
  async editAction(barang: any) {
    try {
      const response = await this._api.edit(barang).toPromise();
      console.log('Response after editing data:', response);
      window.location.reload()
    } catch (error) {
      console.error('Error editing data:', error);
    }
  }
}
