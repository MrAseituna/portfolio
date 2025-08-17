import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent {
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  private readonly EMAILJS_SERVICE_ID  = 'service_o3apy8a';
  private readonly EMAILJS_TEMPLATE_ID = 'template_sax8uxd';
  private readonly EMAILJS_PUBLIC_KEY  = '2pd8e6go26y33t0Bb';

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.maxLength(120)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
    website: [''] // honeypot
  });

  status: 'idle' | 'sending' | 'success' | 'error' = 'idle';
  errorMsg = '';
  copied = false;
  private startTime = performance.now();

  isInvalid(ctrl: keyof typeof this.form.controls) {
    const c = this.form.get(ctrl)!;
    return c.invalid && (c.touched || this.status === 'error');
  }
  showError(ctrl: keyof typeof this.form.controls) { return this.isInvalid(ctrl); }

  private formatTimestamp(d = new Date()): string {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: false,
      timeZone: 'Europe/Madrid'
    }).format(d);
  }

  async submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    // anti-spam
    const hp = this.form.value.website?.trim();
    const elapsed = performance.now() - this.startTime;
    if (hp) return this.fail('Detección anti-spam.');
    if (elapsed < 1500) return this.fail('Demasiado rápido, inténtalo de nuevo.');

    if (!this.EMAILJS_SERVICE_ID || !this.EMAILJS_TEMPLATE_ID || !this.EMAILJS_PUBLIC_KEY) {
      return this.fail('Falta configurar EmailJS.');
    }

    // marcar enviando dentro de zona
    this.zone.run(() => { this.status = 'sending'; this.errorMsg = ''; this.cdr.markForCheck(); });

    try {
      const payload = {
        name:  this.form.value.name,
        email: this.form.value.email,
        title:    this.form.value.subject || '(Sin asunto)',
        message:    this.form.value.message,
        time: this.formatTimestamp()
      };

      await emailjs.send(
        this.EMAILJS_SERVICE_ID,
        this.EMAILJS_TEMPLATE_ID,
        payload,
        { publicKey: this.EMAILJS_PUBLIC_KEY }
      );

      // éxito: actualizar estado dentro de zona y disparar CD
      this.zone.run(() => {
        this.status = 'success';
        this.form.reset({ website: '' });
        this.startTime = performance.now();
        this.cdr.markForCheck();
      });
    } catch {
      this.fail('No se pudo enviar con EmailJS. Prueba con el email directo.');
    }
  }

  private fail(msg: string){
    this.zone.run(() => {
      this.status = 'error';
      this.errorMsg = msg;
      this.cdr.markForCheck();
    });
  }

  async copyEmail(email: string) {
    try {
      await navigator.clipboard.writeText(email);
      this.zone.run(() => {
        this.copied = true;
        this.cdr.markForCheck();
        setTimeout(() => this.zone.run(() => { this.copied = false; this.cdr.markForCheck(); }), 1600);
      });
    } catch {
      this.fail('No se pudo copiar el email.');
    }
  }
}
