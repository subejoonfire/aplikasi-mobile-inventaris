import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient) {}
  tambah(data: { nama: string; jumlah: string }) {
    const url = `http://localhost/apmob-arta/api/tambah.php?nama=${data.nama}&jumlah=${data.jumlah}`;
    return this._http.get(url);
  }
  tampil() {
    const url = 'http://localhost/apmob-arta/api/tampil.php';
    return this._http.get<any[]>(url);
  }
  hapus(id: string) {
    const url = 'http://localhost/apmob-arta/api/hapus.php?id=' + id;
    return this._http.get(url);
  }
  edit(data : any) {
    const url = `http://localhost/apmob-arta/api/edit.php?id=${data.idbarang}&nama=${data.nama}&jumlah=${data.jumlah}`;
    return this._http.get<any>(url);
  }
}
