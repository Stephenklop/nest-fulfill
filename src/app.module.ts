import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './modules/order/order.module';
import { PaymentModule } from './modules/payment/payment.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { ShippingModule } from './modules/shipping/shipping.module';

@Module({
  imports: [OrderModule, PaymentModule, InventoryModule, ShippingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
