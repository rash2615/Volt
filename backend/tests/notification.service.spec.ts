import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from '../src/interface/services/notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationService],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
  });

  it('should send a notification', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    service.sendNotification('Stock Alert');
    expect(consoleSpy).toHaveBeenCalledWith('[Stock Alert] Stock is running low!');
  });
});
