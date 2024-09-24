package ch09.sec03.exam02;

public class AExample {
	public static void main(String[] args) {
		A.B b = new A.B();
		
		System.out.println(b.field1);
		b.method1();
		
		// B 클래스의 정적 필드와 메소드 사용
		System.out.println(A.B.field2);
		A.B.method2();
	}
}
