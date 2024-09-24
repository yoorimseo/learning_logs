package ch07.sec02;

public class SmartPhoneExample {
	public static void main(String[] args) {
		SmartPhone myPhone = new SmartPhone("iPhone11", "purple");
		
		System.out.println("모델: " + myPhone.model);
		System.out.println("색상: " + myPhone.color);
		
		System.out.println("와이파이 상태: " + myPhone.wifi);
		
		myPhone.bell();
		myPhone.sendVoice("여보세요.");
		myPhone.receiveVoice("안녕하세요! 저는 서유림입니다.");
		myPhone.sendVoice("네~ 반갑습니다~");
		myPhone.hangUp();
		
		myPhone.setWifi(true);
		myPhone.internet();
	}
}
