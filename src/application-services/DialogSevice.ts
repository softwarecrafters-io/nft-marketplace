import { Subject } from 'rxjs';

export class OkMessage {
	private constructor(readonly message: string, readonly okCommand?: () => void) {}

	static create(message: string, okCommand?: () => void) {
		return new OkMessage(message, okCommand);
	}
}

export class YesNoMessage {
	private constructor(readonly message: string, readonly yesCommand: () => void, readonly noCommand?: () => void) {}

	static create(message: string, yesCommand: () => void, noCommand?: () => void) {
		return new YesNoMessage(message, yesCommand, noCommand);
	}
}

export class DialogSevice {
	messageBus: Subject<OkMessage | YesNoMessage> = new Subject<OkMessage | YesNoMessage>();

	pushOkMessage(message: string, okCommand?: () => void) {
		this.messageBus.next(OkMessage.create(message, okCommand));
	}

	pushYesNoMessage(message: string, yesCommand: () => void, noCommand?: () => void) {
		this.messageBus.next(YesNoMessage.create(message, yesCommand, noCommand));
	}
}
