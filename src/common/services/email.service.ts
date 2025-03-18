import { BadRequestException, Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import * as fs from 'fs';
import * as path from 'path';
import { env } from 'process';

@Injectable()
export class EmailService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(env.RESEND_API_KEY);
  }

  /**
   * Sends a ticket confirmation email
   */

  async sendTicketConfirmation(options: {
    backdrop_path: string;
    movieTitle: string;
    date: string;
    time: string;
    seats: string;
    theater: string;
    transactionId: string;
    email: string;
  }) {
    try {
      const templatePath = path.join(
        process.cwd(),
        'src',
        'templates',
        'emails',
        'ticket-template.html',
      );
      let htmlTemplate = fs.readFileSync(templatePath, 'utf8');

      htmlTemplate = htmlTemplate
        .replace('{{backdrop_path}}', options.backdrop_path)
        .replace('{{movieTitle}}', options.movieTitle)
        .replace('{{date}}', options.date)
        .replace('{{time}}', options.time)
        .replace('{{seats}}', options.seats)
        .replace('{{theater}}', options.theater)
        .replace('{{transactionId}}', options.transactionId);

      const response = await this.resend.emails.send({
        from: '🍿 Cartelix <onboarding@resend.dev>',
        to: [options.email],
        subject: `Your Ticket Confirmation for ${options.movieTitle}`,
        html: htmlTemplate,
      });

      return response;
    } catch {
      throw new BadRequestException('Error sending ticket confirmation email');
    }
  }
}
