import { NgModule } from '@angular/core';
import { DecodeURIComponentPipe } from './decode-pipe';
import { CommonModule } from '@angular/common';
import { EscapeHtmlPipe } from './safe-html-pipe';


@NgModule({
  declarations: [
    DecodeURIComponentPipe,
    EscapeHtmlPipe
  ],
  exports:[DecodeURIComponentPipe, EscapeHtmlPipe],
  imports: [
    CommonModule,
  ],
})
export class PipeModule {}
