import { Component } from '@angular/core';
import { FormComponent } from "../../components/contact/form/form.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

}
