package ch09.sec07.exam03;

public class ButtonExample {
	public static void main(String[] args) {
		Button btnOk = new Button();
		
		btnOk.setClickListener(new Button.ClickListener() {
			@Override
			public void onClick() {
				System.out.println("Ok 버튼을 클릭했습니다.");
				
			}
		});
		
		btnOk.click();
		
		Button btnCancle = new Button();
		
		btnCancle.setClickListener(new Button.ClickListener() {
			@Override
			public void onClick() {
				System.out.println("Cancle 버튼을 클릭했습니다.");
				
			}
		});
		
		btnCancle.click();
	}
}
