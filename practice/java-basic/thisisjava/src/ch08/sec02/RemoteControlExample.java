package ch08.sec02;

public class RemoteControlExample {
	public static void main(String[] args) {
		// RemoteControl rc = new Television(); 도 가능
		RemoteControl rc;
		
		rc = new Television();
		rc.turnOn();
		
		rc = new Audio();
		rc.turnOn();
	}
}
