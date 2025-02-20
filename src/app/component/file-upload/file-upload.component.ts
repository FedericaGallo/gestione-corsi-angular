import { Component, DestroyRef } from '@angular/core';
import { DocentiService, DocenteCorsi } from '../../service/docenti.service';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
 fileName: string = '';
 fileUploadError: boolean = false;
 form = new FormGroup({
 nome: new FormControl('', {
 validators: [ Validators.required ]
 }),
 cognome: new FormControl('', {
 validators: [ Validators.required ]
 })
 });
 constructor(private docentiService: DocentiService, private destroyRef: DestroyRef){}
 onSubmit(){
 console.log(this.form.value.nome);
 this.docentiService.postDocente.subscribe();
 }
 onFileSelected(event){
   const file:File = event.target.files[0];
   if (file){
  this.fileName = file.name;
  }
}
}

