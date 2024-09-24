package ch06.sec15;

public class Singleton {
	// public 접근 권한을 갖는 정적 필드 선언과 초기화
	private static Singleton singleton = new Singleton();  // 1

	// private 접근 권한을 갖는 생성자 선언
	private Singleton() {}

	// public 접근 권한을 갖는 정적 메소드 선언
	public static Singleton getInstance() {  // 2
		return singleton;
	}
}