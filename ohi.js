/** Modified Version (http://ohi.pat.im)

 * Modifier : Pat-Al <pat@pat.im> (https://pat.im/910)
 * Last Update : 2018/05/07

 * Added support for more keyboard layouts by custom keyboard layout tables.
 * Added support for Dvorak and Colemak keyboard basic_layouts.
 * Added support for Firefox 12 and higher version.
 * Added the on-screen keyboard function.
 * Added support for old Hangeul combination by Syllable-Initial-Peak-Final Encoding Approach.
 * Added support for multi-key input (moachigi).

**/

/** Original Version (copy - http://ohi.pat.im/org)

 * Author : Ho-Seok Ee <hsee@korea.ac.kr>
 * Release: 2006/07/18
 * Update : 2011/01/22

 Copyright (C) Ho-Seok Ee <hsee@korea.ac.kr>. All rights reserved.

  This program is free software; you can redistribute it and/or
  modify it under the terms of the GNU General Public License as
  published by the Free Software Foundation; either version 2 of
  the License, or (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  GNU General Public License for more details.

  The license can be found at http://www.gnu.org/licenses/gpl.txt.

**/

var default_En_type = 'QWERTY';
var default_Ko_type = 'Sin3-P2';
var default_ohi_KBD_type = 'QWERTY';
var default_ohi_KE = 'Ko';

var default_enable_double_final_ext = 0;
var default_enable_sign_ext = 1;
var default_force_normal_typing = 0;
var default_only_CGG_encoding = 0;
var default_enable_old_hangeul_input = 0;
var default_enable_Sin3_diphthong_key = 1;
var default_enable_adding_cheos_with_shift_key = 1;
var default_phonemic_writing = 0;
var default_phonemic_writing_in_single_phoneme = 1;
var default_phonemic_writing_in_halfwidth_letter = 0;
var default_abbreviation = 0;
var default_convenience_combination = 0;
var default_sunalae = 0;

var default_square_layout = 1;

var En_type; // 영문 자판 종류 (ohiChange 함수로 바꿈)
var Ko_type; // 한글 자판 종류 (ohiChange 함수로 바꿈)
var ohi_KBD_type; // 기준 자판 종류 (QWERTY/QWERTZ/AZERTY, ohiChange_KBD_type 함수로 바꿈)
var ohi_KE; // 한글·영문 상태 (Ko: 한글, En: 영문) (ohiChange_KE 함수로 바꿈)

// En_type, Ko_type 등이 미리 지정되어 있으면 지정된 것으로 초기값을 바꿈
if(typeof En_type != 'undefined') default_En_type = En_type; else En_type = default_En_type;
if(typeof Ko_type != 'undefined') default_Ko_type = Ko_type; else Ko_type = default_Ko_type;
if(typeof ohi_KBD_type != 'undefined') default_ohi_KBD_type = ohi_KBD_type; else ohi_KBD_type = default_ohi_KBD_type;
if(typeof ohi_KE != 'undefined') default_ohi_KE = ohi_KE; else ohi_KE = default_ohi_KE;

if(typeof enable_sign_ext != 'undefined') default_enable_sign_ext = enable_sign_ext;
if(typeof force_normal_typing != 'undefined') default_force_normal_typing = force_normal_typing;
if(typeof phonemic_writing != 'undefined') default_phonemic_writing = phonemic_writing;
if(typeof phonemic_writing_in_single_phoneme != 'undefined') default_phonemic_writing_in_single_phoneme = phonemic_writing_in_single_phoneme;
if(typeof phonemic_writing_in_halfwidth_letter != 'undefined') default_phonemic_writing_in_halfwidth_letter = phonemic_writing_in_halfwidth_letter;
if(typeof square_layout != 'undefined') default_square_layout = square_layout;


function option() {
	var enable_double_final_ext; // 겹받침 확장 배열 쓰기 --> ohiChange_enable_double_final_ext() 함수로 값을 바꿈
	var enable_sign_ext; // 세벌식 자판의 기호 확장 배열 쓰기 --> ohiChange_enable_sign_ext() 함수로 값을 바꿈
	var force_normal_typing; // 모아치기 자판을 이어치기(일반 타자법)로 치게 하기
	var only_CGG_encoding; // 옛한글 자판에서 첫가끝 부호 체계만 쓰기
	var enable_old_hangeul_input; // 옛한글 조합하기
	var enable_Sin3_diphthong_key; // 0이면 신세벌식 자판에서 오른쪽 글쇠로 홀소리를 넣을 수 없음
	var phonemic_writing; // 풀어쓰기
	var phonemic_writing_in_single_phoneme; // 풀어쓰기할 때 겹낱자를 홑낱자로 풀기
	var phonemic_writing_in_halfwidth_letter; // 반각 한글 낱자로 풀어쓰기
	var abbreviation; // 이어치기 자판에서 줄임말 기능 쓰기
	var convenience_combination; // 입력 편의를 높이는 추가 낱자 조합 쓰기
	var sunalae; // 두벌식 자판 순아래 조합
	
	var show_layout; // 1: 자판 배열표 보이기  0: 자판 배열표 감추기 --> show_keyboard_layout() 함수로 값을 바꿈
	var turn_off_OHI; // OHI 입력 기능 끄기 (끄더라도 화상 자판은 그대로 쓸 수 있음)
	var squred_layout; // 화상 배열표를 네모지게 나타내기
}

function NCR_option() {
	var enable_NCR; // HTML 문자 참조 보기
	var convert_only_CGG_encoding; // 첫가끝 조합형으로 들어간 한글만 바꾸기
}

var option=new option();
option.enable_double_final_ext = default_enable_double_final_ext;
option.enable_sign_ext = default_enable_sign_ext;
option.force_normal_typing = default_force_normal_typing;
option.only_CGG_encoding = default_only_CGG_encoding;
option.enable_old_hangeul_input = default_enable_old_hangeul_input;
option.enable_Sin3_diphthong_key = default_enable_Sin3_diphthong_key;
option.enable_Sin3_adding_cheos_with_shift_key = default_enable_adding_cheos_with_shift_key;
option.phonemic_writing = default_phonemic_writing;
option.phonemic_writing_in_single_phoneme = default_phonemic_writing_in_single_phoneme;
option.abbreviation = default_abbreviation;
option.convenience_combination = default_convenience_combination;
option.sunalae = default_sunalae;

option.turn_off_OHI = 0;
option.show_layout = 1;
option.square_layout = default_square_layout;

var NCR_option = new NCR_option();
NCR_option.enable_NCR = 0;
NCR_option.convert_only_CGG_encoding = 0;

var ohiQ = [0,0,0,0,0,0,0,0,0]; // 조합하고 있는 완성형 한글 낱내의 낱자들을 담는 배열 [첫,첫,첫,가,가,가,끝,끝,끝]
var ohiRQ = [0,0,0,0,0,0,0,0,0]; // 조합하고 있는 완성형 한글 낱내의 낱자들의 추가 정보를 담는 배열 (보기: 겹홀소리 조합용 홀소리인지, 받침 붙는 홀소리인지)
var backup_ohiQ = []; // 완성형 한글 낱내를 옛한글 상태로 바꿀 때에 복사해 두는 배열
var backup_ohiRQ = [];
var backspaces_for_restoring_prev_state = 0; // 모아치기 자판이나 줄임말 기능을 쓸 때 바로 앞선 상태로 돌아가는 데에 필요한 뒷걸음쇠(backspace) 타수
var abbriviation_processing_state = 0; // 줄임말 처리를 하고 있는지를 나타내는 변수

var ohiStatus = document.createElement('div');
var ohiTimeout = 0;

var sign_ext_state = 0; // 기호 확장 배열 상태를 나타내는 변수

var onkeypress_skip = 0; // ohiKeypress() 처리를 건너뛰기 (보기: 오른쪽 숫자판을 눌렀을 때)
var onkeyup_skip = 0; // ohiKeyup() 처리를 건너뛰기

var shift_lock = 0; // 한글 타자기 받침 글쇠 눌린 상태
var shift_click = 0; // 배열표에서 윗글쇠 누른 상태
var shiftlock_click = 0; // 배열표에서 Shift Lock을 누른 상태

var browser = '', browser_ver = 0, nu = navigator.userAgent;
var dkey, ukey;

var pressed_keys = []; // 모아친 글쇠들의 값
var pressing_keys = 0; // 눌려 있는 글쇠 수

var prev_phoneme = []; // 첫가끝 방식으로 한글을 조합할을 때에 글쇠로 친 낱자들을 차례로 담는 배열 (먼저 나중에 친 낱자가 배열의 맨 앞에 들어감)
var prev_combined_phoneme = []; // 조합해 나간 첫가끝 낱자들을 차례로 담는 배열
var prev_phoneme_R = []; // 조합하는 첫가끝 낱자들의 추가 정보를 담는 배열 (보기: 겹홀소리 조합용 홀소리인지, 받침 붙는 홀소리인지)

var hangeul_combination_table_default; // 요즘한글 낱자 조합표
var hangeul_combination_table_full; // 요즘한글+옛한글 낱자 조합표
var ohiHangeul3_HanExtKey=0; // 한글 확장 글쇠가 눌린 상태

var ohi_cheos, ohi_ga, ohi_ggeut, ohi_hotbadchim; // OHI에서 쓰는 요즘한글 첫·가·끝 낱자
var unicode_CGG_hangeul_phoneme = [], unicode_cheos = [], unicode_ga = [], unicode_ggeut=[]; // 유니코드 한글 낱자, 유니코드 한글 첫·가·끝 낱자
var unicode_modern_cheos = [], unicode_modern_ga = [], unicode_modern_ggeut = []; // 유니코드 요즘한글 첫·가·끝 낱자
var compatibility_hangeul_phoneme = [], compatibility_cheos = [], compatibility_ga = [], compatibility_ggeut = []; // 유니코드 한글 호환 자모
var halfwidth_cheos = [], halfwidth_ga = [], halfwidth_ggeut= [];

var current_layout=[];

function browser_detect() {
	var trident=navigator.userAgent.match(/Trident\/(\d\.\d)/i);
	var trident_ver = trident===undefined || !trident ? 0 : parseFloat(trident[1]);
	if(nu.indexOf('MSIE')>=0 || trident_ver>=7) {
		browser = "MSIE";
		if(trident_ver<7) {
			browser_ver = parseFloat(nu.substring(nu.indexOf("MSIE ")+5));
		}
		else if(trident_ver==7) {
			browser_ver=11;
		}
	}
	else if(nu.indexOf('Firefox') != -1) {
		browser = "Firefox";
		browser_ver = parseFloat(nu.substring(nu.indexOf('Firefox/')+8));
	}
	else if(nu.indexOf('Chrome') != -1) {
		browser = "Chrome";
		browser_ver = parseFloat(nu.substring(nu.indexOf('Chrome/')+7));
	}
}

function ohiBackspace(f,opt) { // backspace 글쇠를 누르지 않았을 때에 backspace 동작을 하게 함
	if(document.selection && browser=='MSIE' && browser_ver<9) {
		var s=document.selection.createRange();
		s.moveStart('character', -f.value.length);
		var pos = s.text.length;
		if(f.setSelectionRange) {
			f.setSelectionRange(pos-1,pos);
			f.text='';
		}
		else if(f.createTextRange) {
			var range = f.createTextRange();
			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos-1);
			range.select();
			range.text = '';
		}
	}
	else {
		var bs_start = f.selectionStart;
		var bs_end = f.selectionEnd;
		if(bs_start == bs_end) {
			f.value = f.value.substr(0,bs_start-1)+f.value.substr(bs_end);
			f.selectionStart=f.selectionEnd=bs_start-1;
		}
		else {
			f.value = f.value.substr(0,bs_start)+f.value.substr(bs_end);
			f.selectionStart=f.selectionEnd=bs_start;
		}
	}
	if(typeof opt == 'undefined' || !opt) ohiInsert(f,0,0);
}

function ohiHangeul_moa_backspace(f,e) {
	var i;
	if(!backspaces_for_restoring_prev_state) {
		if(ohiHangeul_backspace(f,e)) ohiBackspace(f);
	}
	else {
		while(backspaces_for_restoring_prev_state--) {
			if(ohiHangeul_backspace(f,e)) ohiBackspace(f);
		}
		backspaces_for_restoring_prev_state=0;
	}
	esc_ext_layout();
	return 0;
}

function ohiHangeul_backspace(f,e) {
	var i,j;
	var KE=ohi_KE;

	// Backspace (기호 확장 배열 상태일 때)
	if(option.enable_sign_ext && sign_ext_state) {
		if(e.preventDefault) e.preventDefault();
		if(Ko_type.substr(0,4)=='Sin3') ohiBackspace(f);
		esc_ext_layout();
		return false;
	}

	if(ohiQ[1] || ohiQ[4] || ohiQ[0]&&ohiQ[3]) { // Backspace (요즘한글 조합 상태)
		if(e.preventDefault) e.preventDefault();
		for(i=8; !ohiQ[i];) i--;
		ohiInsert(f,ohiQ[i]=0,ohiQ);
		ohiRQ[i]=0;
		
		esc_ext_layout();
		return false;
	}

	if(KE=='Ko' && prev_phoneme.length) {	// 첫가끝 조합 상태
		if(!ohiHangeul3_HanExtKey) {
			if(e.preventDefault) e.preventDefault();
			ohiBackspace(f);			
			if(browser=="MSIE" && browser_ver<9 ) { // IE ~8
				i=prev_combined_phoneme.length-1; while(i--) ohiBackspace(f);
			}
			var temp_prev_phoneme = prev_phoneme.slice(0);
			var temp_prev_phoneme_R = prev_phoneme_R.slice(0);
			prev_phoneme.splice(0);
			prev_phoneme_R.splice(0);
			prev_combined_phoneme.splice(0);
			for(i=temp_prev_phoneme.length-1; i>=1; --i) {
					CGG_yesHangeul(f,0,(temp_prev_phoneme_R[i] ? -1:1)*temp_prev_phoneme[i]);
			}
		}

		if(!is_old_hangeul_input()) {
		// 아래아 등이 지워졌을 때 첫가끝 코드 조합 상태에서 요즘한글(완성형) 코드로 바꾸기
			for(i=0;i<prev_combined_phoneme.length;++i) {
				if(unicode_cheos.indexOf(prev_combined_phoneme[i]) > ohi_cheos.length-1 || unicode_ga.indexOf(prev_combined_phoneme[i]) > ohi_ga.length-1 || unicode_ggeut.indexOf(prev_combined_phoneme[i]) > ohi_ggeut.length-1) break;
			}
			if(i==prev_combined_phoneme.length) {	// 첫가끝 방식으로 조합하던 낱자들을 지우고 요즘한글 방식으로 첫소리만 넣기
				if(e.preventDefault) e.preventDefault();
				ohiBackspace(f);
				if(browser=="MSIE" && browser_ver<9 ) {
					i=prev_combined_phoneme.length-1; while(i--) ohiBackspace(f);
				}
				for(i=prev_combined_phoneme.length;i>=0;--i) {
					if(unicode_cheos.indexOf(prev_combined_phoneme[i])>=0) {
						ohiQ = backup_ohiQ.slice(0);
						ohiRQ = backup_ohiRQ.slice(0);
						ohiInsert(f,0,ohiQ);
						break;
					}
				}
				prev_phoneme.splice(0);
				prev_phoneme_R.splice(0);
				prev_combined_phoneme.splice(0);
			}
		}
		else {
			if(e.preventDefault) e.preventDefault();
		}

		esc_ext_layout();
		return false;
	}

	return true;
}

function ohiDoubleJamo(a,c,d) {
	var i, j=[ // Double Jamos
		[ [1,7,18,21,24],1,7,18,21,24 ], // Cho
		[ [39,44,49],[31,32,51],[35,36,51],51 ], // Jung
		[ [1,4,9,18,21],[1,21],[24,30],[1,17,18,21,28,29,30],[0,21],21 ] // Jong
	];

	a=j[a];
	for(i=a[0].length; c!=a[0][i-1]; i--) if(!i) return i;
	for(a=a[i], i=a.length||1; 1; i--) if(!i || d==a || d==a[i-1]) return i;
}

function ohiInsert(f,m,c) { // Insert
// c가 숫자이면 그 부호값에맞는 유니코드 부호를 넣음
// c가 배열(ohiQ)이면 유니코드 완성형 한글로 넣음
	if(!c) {
		ohiQ = ohiRQ = [0,0,0,0,0,0,0,0,0];
		return true;
	}

	if(c.length!=9) ohiQ = ohiRQ = [0,0,0,0,0,0,0,0,0];
	else {
		var m=m||'0,0,0,0,0,0,0,0,0', i=c[0]+c[1]+c[2], j=c[3]+c[4]+c[5], k=c[6]+c[7]+c[8];
		c=i&&j?0xac00+(i-(i<3?1:i<5?2:i<10?4:i<20?11:12))*588+(j-31)*28+k-(k<8?0:k<19?1:k<25?2:3):0x3130+(i||j||k);

		if(option.phonemic_writing) {
		// 풀어쓰기로 낱자 넣기 (갈마들이 자판이 아닐 때)
			if(!is_galmadeuli_input()) {
				ohiInsert(f,0,32);
				ohiBackspace(f);
				c=0x3130+(i||j||k);
			}
		}
	}

	if(document.selection && browser=="MSIE" && browser_ver<10 ) { // IE ~9
		var s=document.selection.createRange(), t=s.text;
		if(t && document.selection.clear) document.selection.clear();
		s.text=(m=='0,0,0,0,0,0,0,0,0'||c&&t.length>1?'':t.substr(0,t.length))+String.fromCharCode(c);
		if(!c || !m || s.moveStart('character',-1)) {
			s.select();
		}
	}
	else if(f.selectionEnd+1) {
		if(m!='0,0,0,0,0,0,0,0,0' && f.selectionEnd-f.selectionStart==1) f.selectionStart++;
		var e=document.createEvent('KeyboardEvent');
		if(e.initKeyEvent && !(browser=="Firefox" && browser_ver>=12 ) && browser!="Chrome") { // Gecko
			e.initKeyEvent('keypress',0,0,null,0,0,0,0,127,c);
			if(c && f.dispatchEvent(e) && m) f.selectionStart--;
		} else { // Firefox 12~, Chrome
			var scrollTop = f.scrollTop, scrollLeft = f.scrollLeft, selectionStart = f.selectionStart;
			var endText = f.value.substr(f.selectionEnd,f.value.length);
			f.value = f.value.substr(0,selectionStart)+String.fromCharCode(c);
			var scrollHeight = f.scrollHeight, scrollWidth = f.scrollWidth;
			f.value += endText;
			if(c==13 && browser=='MSIE' && browser_ver==11 && !endText.length) {
			// IE 11에서 뒤에 아무 문자 없을 때 줄을 바꾸면 한글 조합이 안 됨
				f.value += String.fromCharCode(32);
			}
			f.scrollTop = (scrollTop > scrollHeight-f.clientHeight) ? scrollTop : scrollHeight-f.clientHeight;
			f.scrollLeft = (scrollLeft > scrollWidth-f.clientWidth) ? scrollLeft : scrollWidth-f.clientWidth;
			f.setSelectionRange(m || c<32 ? selectionStart:selectionStart+1, selectionStart+1);
		}
	}
}

function ohiSelection(f,length) {
	if(document.selection && browser=="MSIE" && browser_ver<9) { // IE ~8
	}
	else if(f.selectionEnd+1) {
		var e=document.createEvent('KeyboardEvent');
		if(e.initKeyEvent && !(browser=="Firefox" && browser_ver>=12 ) && browser!="Chrome") { // Gecko
			f.selectionStart-=length;
		} else { // Firefox 12~, Chrome
			f.selectionStart=f.selectionEnd-length;
		}
	}
}

function esc_ext_layout() { // 기호 확장 배열 또는 한글 확장 배열을 상태에서 기본 배열을 쓰는 상태로 바꿈
	var KE = ohi_KE;
	if(ohiHangeul3_HanExtKey || sign_ext_state) {
		if(KE=='Ko') {
			sign_ext_state=0;
			ohiHangeul3_HanExtKey=0;
			show_keyboard_layout(Ko_type);
		}
	}
	sign_ext_state=0;
	ohiHangeul3_HanExtKey=0;
}

function combine_unicode_hangeul_phoneme(c1,c2) { // 유니코드 한글 낱자 조합하기
	var i;
	var combination_table;
	var combined_phoneme;
	if(typeof current_layout.moachigi_hangeul_combination_table != 'undefined' && typeof current_layout.hangeul_combination_table == 'undefined') {
	// 모아치기 자판을 이어치기 방식으로 쓸 때
		combination_table = current_layout.moachigi_hangeul_combination_table;
		for(i=0; i<combination_table.length; ++i) {
			if(combination_table[i].phonemes.length!=2) continue;
			if(combination_table[i].phonemes.indexOf(c1)<0 || combination_table[i].phonemes.indexOf(c2)<0) continue;
			if(c1==c2 && combination_table[i].phonemes[0]!=combination_table[i].phonemes[1]) continue;
			combined_phoneme=combination_table[i].char;
			break;
		}

		if(i==combination_table.length) return 0;
		return combined_phoneme;
	}
	else {
	// 이어치기 자판
		combination_table=hangeul_combination_table_default;
		if(is_old_hangeul_input()) combination_table=hangeul_combination_table_full;

		if(typeof current_layout.hangeul_combination_table != 'undefined' && typeof current_layout.hangeul_combination_table.length != 'undefined' && current_layout.hangeul_combination_table.length) {
			// 일반 낱자 조합
			combination_table = current_layout.hangeul_combination_table;
		}

		if(option.convenience_combination && typeof current_layout.hangeul_convenience_combination_table != 'undefined' && !is_old_hangeul_input()) {
			// 편의를 높이기 위한 낱자 조합을 더함 (옛글한 자판이 아닌 일반 자판)
			combination_table = combination_table.concat(current_layout.hangeul_convenience_combination_table);
		}

		// 옛한글 낱자 조합
		if(current_layout.type_name.substr(-2)=='-y' && typeof current_layout.combination_table != 'undefined') {
			combination_table = current_layout.combination_table;
		}
		else if(option.enable_old_hangeul_input) {
			if(typeof current_layout.old_hangeul_layout_type_name != 'undefined' && typeof find_layout_info('Ko', current_layout.old_hangeul_layout_type_name).combination_table != 'undefined') {
				combination_table = find_layout_info('Ko', current_layout.old_hangeul_layout_type_name).combination_table;
			}
		}

		var combined_phoneme=0x10000*c1+c2;
		for(i=0; i<combination_table.length; ++i) {
			if(combined_phoneme==combination_table[i][0]) {
				combined_phoneme=combination_table[i][1];
				break;
			}
		}
		if(i==combination_table.length) return 0;
		return combined_phoneme;
	}
}

function complete_hangeul_syllable(f) { // 첫가끝 조합형 낱내를 유니코드 완성형 낱내로 바꿈
	if(!prev_phoneme.length) return;
	ohiSelection(f,0);
	var i;
	if(!option.only_CGG_encoding) {
		if(unicode_modern_cheos.indexOf(prev_combined_phoneme[1])>=0 && unicode_modern_ga.indexOf(prev_combined_phoneme[0])>=0
		 || unicode_modern_cheos.indexOf(prev_combined_phoneme[2])>=0 && unicode_modern_ga.indexOf(prev_combined_phoneme[1])>=0 && unicode_modern_ggeut.indexOf(prev_combined_phoneme[0])>=0) {
		// 첫+가 또는 첫+가+끝
			if(unicode_modern_cheos.indexOf(prev_combined_phoneme[1])>=0) {
				i=2; while(i--) ohiBackspace(f);
				ohiQ = [prev_combined_phoneme[1]-0x1100+11+(prev_combined_phoneme[1]>0x1108 ? 1:0),0,0,prev_combined_phoneme[0]-0x1161+31,0,0,0,0,0];
			} else {
				i=3; while(i--) ohiBackspace(f);
				ohiQ = [prev_combined_phoneme[2]-0x1100+11+(prev_combined_phoneme[2]>0x1108 ? 1:0),0,0,prev_combined_phoneme[1]-0x1161+31,0,0,prev_combined_phoneme[0]-0x11A8+1+(prev_combined_phoneme[0]>0x11AE ? 1:0)+(prev_combined_phoneme[0]>0x11B8 ? 1:0)+(prev_combined_phoneme[0]>0x11BD ? 1:0),0,0];
			}
			ohiInsert(f,0,ohiQ);
		}
	}
	prev_phoneme.splice(0);
	prev_phoneme_R.splice(0);
	prev_combined_phoneme.splice(0);
}

function convert_into_ohi_hangeul_phoneme(c) {
// 유니코드의 요즘한글 낱자 코드와 홀소리 호환 낱자 코드를 ohi에서 쓰는 코드로 바꾸기 (옛한글 낱자는 바꾸지 않음)
	if(unicode_modern_cheos.indexOf(c)>=0) c=ohi_cheos[unicode_modern_cheos.indexOf(c)];
	else if(unicode_modern_ga.indexOf(c)>=0) c=ohi_ga[unicode_modern_ga.indexOf(c)];
	else if(unicode_modern_ggeut.indexOf(c)>=0) c=ohi_ggeut[unicode_modern_ggeut.indexOf(c)];
	else if(compatibility_ga.indexOf(c)>=0) c=ohi_ga[compatibility_ga.indexOf(c)];

	return c;
}

function convert_into_unicode_hangeul_phoneme(c) {
// ohi에서 쓰는 한글 낱자 코드를 유니코드로 바꾸기
	if(ohi_cheos.indexOf(c)>=0) c=unicode_cheos[ohi_cheos.indexOf(c)];
	else if(ohi_ga.indexOf(c)>=0) c=unicode_ga[ohi_ga.indexOf(c)];
	else if(ohi_ggeut.indexOf(c)>=0) c=unicode_ggeut[ohi_ggeut.indexOf(c)];
	return c;
}

function convert_into_compatibility_hangeul_letter(c) {
// 호환 한글 자모로 바꾸기
	c=convert_into_unicode_hangeul_phoneme(c);

	old_hangeul_cheos = [0x1140,0x114C,0x1159];
	old_hangeul_ga = [0x119E];
	old_hangeul_ggeut = [0x11EB,0x11F0,0x11F9];
	compatibility_yeshangeul_dah = [0x317F,0x3181,0x3186]; // ㅿ,ㆁ,ㆆ
	compatibility_yeshangeul_hol = [0x318D]; // ㆍ

	if(unicode_modern_cheos.indexOf(c)>=0) c=compatibility_cheos[unicode_modern_cheos.indexOf(c)];
	else if(unicode_modern_ga.indexOf(c)>=0) c=compatibility_ga[unicode_modern_ga.indexOf(c)];
	else if(unicode_modern_ggeut.indexOf(c)>=0) c=compatibility_ggeut[unicode_modern_ggeut.indexOf(c)];
	else if(old_hangeul_cheos.indexOf(c)>=0)	c=compatibility_yeshangeul_dah[old_hangeul_cheos.indexOf(c)];
	else if(old_hangeul_ga.indexOf(c)>=0) c=compatibility_yeshangeul_hol[old_hangeul_ga.indexOf(c)];
	else if(old_hangeul_ggeut.indexOf(c)>=0) c=compatibility_yeshangeul_dah[old_hangeul_ggeut.indexOf(c)];

	return c;
}

function convert_into_halfwidth_hangeul_letter(c) {
	c=convert_into_unicode_hangeul_phoneme(c);

	if(unicode_modern_cheos.indexOf(c)>=0) c=halfwidth_cheos[unicode_modern_cheos.indexOf(c)];
	else if(unicode_modern_ga.indexOf(c)>=0) c=halfwidth_ga[unicode_modern_ga.indexOf(c)];
	else if(unicode_modern_ggeut.indexOf(c)>=0) c=halfwidth_ggeut[unicode_modern_ggeut.indexOf(c)];
	else if(compatibility_hangeul_phoneme.indexOf(c)>=0) c=halfwidth_hangeul_phoneme[compatibility_hangeul_phoneme.indexOf(c)];
/*	else if(compatibility_cheos.indexOf(c)>=0) c=halfwidth_cheos[compatibility_cheos.indexOf(c)];
	else if(compatibility_ga.indexOf(c)>=0) c=halfwidth_cheos[compatibility_ga.indexOf(c)];
	else if(compatibility_ggeut.indexOf(c)>=0) c=halfwidth_ggeut[compatibility_ggeut.indexOf(c)];*/

	return c;
}

function convert_into_single_phonemes(combined_phoneme) {
// 겹낱자를 홀낱자들로 바꿈
	var i, single_phonemes=[];
	combined_phoneme = convert_into_unicode_hangeul_phoneme(combined_phoneme);
	combination_table = hangeul_combination_table_default;
	for(var i=0; i<combination_table.length; ++i) {
		if(combined_phoneme==combination_table[i][1]) {
			single_phonemes[0]=parseInt(combination_table[i][0]/0x10000);
			single_phonemes[1]=combination_table[i][0]%0x10000;
			break;
		}
	}
	return single_phonemes;
}

function no_shift(key) {	// 윗글쇠를 누르지 않고 치는 글쇠인지
	if(key==0x27) return 1;
	else if(key<=0x2B) return 0;
	else if(key<=0x39) return 1;
	else if(key==0x3b || key==0x3d) return 1;
	else if(key<=0x5a) return 0;
	else if(key<=0x5d) return 1;
	else if(key<=0x5f) return 0;
	else if(key<=0x7a) return 1;
	else if(key<=0x7e) return 0;
	return 0;
}

function ohiRoman(f,e,key) { // Roman keyboard basic_layouts (Dvorak, Colemak)
	var c=key;
	if(En_type!='QWERTY') c=current_layout.layout[key-33];
	ohiInsert(f,0,c);
}

function ohiHangeul2(f,e,key) { // 2-Beolsik
	if((Ko_type.indexOf('KSX5002')>=0 || Ko_type=='2-KPS9256') && (key<65 || (key-1)%32>25)) {
		ohiInsert(f,0,key);
		return;
	}
	var c;

	if(typeof current_layout.layout != 'undefined') {
		c = convert_into_ohi_hangeul_phoneme(current_layout.layout[key-33]);
		if(c==current_layout.layout[key-33]) {
			ohiInsert(f,0,key);
			return;
		}
		if(ohi_cheos.indexOf(c)>=0) c-=127;
		else if(ohi_ga.indexOf(c)>=0) c-=35;
		else if(ohi_ggeut.indexOf(c)>=0) c-=127;
	}
	else {
		if(Ko_type.indexOf('KSX5002')>=0)
		 	c=[17,48,26,23,7,9,30,39,33,35,
 			    31,51,49,44,32,36,18,1,4,
 			    21,37,29,24,28,43,27][key%32-1];
		else if(Ko_type=='2-KPS9256')
			c=[/*a*/24,/*b*/48,/*c*/26,/*d*/23,/*e*/7,/*f*/4,/*g*/21,/*h*/39,
			    /*i*/35,/*j*/31,/*k*/51,/*l*/49,/*m*/33,/*n*/43,/*o*/32,/*p*/36,
			    /*q*/18,/*r*/9,/*s*/1,/*t*/30,/*u*/44,/*v*/29,/*w*/17,/*x*/28,
			    /*y*/37,/*z*/27][key%32-1];

		if(key>64 && key<91) {
		// 한글 낱자가 든 글쇠를 윗글쇠와 함께 눌렀을 때
			c += c==32||c==36?2:c==18||c==7||c==24||c==1||c==21?1:0;
		}
	}

	if(c<31) { // Jaum
		if((!ohiQ[7] || !(ohiQ[0]=-1)) && ohiQ[3]) ohiQ[7]=ohiDoubleJamo(2,ohiQ[6],c);
		if(!ohiQ[3] || ohiQ[0]<0 || ohiQ[0] && (!ohiQ[6] || !ohiQ[7]) && (ohiQ[6] || c==8 || c==19 || c==25))
			ohiInsert(f,(ohiQ=ohiQ[1]||ohiQ[3]||!ohiDoubleJamo(0,ohiQ[0],c)?ohiQ:0),ohiQ=[c,ohiQ?0:1,0,0,0,0,0,0,0]);
		else if(!ohiQ[0] && ohiQ[3]) {
		// 닿소리 없이 홀소리가 들어왔고 닿소리가 눌렸을 때 새 낱내로 조합하기
			ohiInsert(f,ohiQ,ohiQ);
			ohiInsert(f,0,ohiQ=[c,0,0,0,0,0,0,0,0]);
		}
		else if(!ohiQ[0] && (ohiQ[0]=c) || (ohiQ[6]=ohiQ[6]||c)) ohiInsert(f,0,ohiQ);
		if(ohiQ[7]) ohiQ[7]=c;
	}
	else { // Moum
		if(option.sunalae || Ko_type.substr(0,5)=='2-sun') {
			if(ohiQ[3]==c && !ohiQ[1] && !ohiQ[6] && (ohiQ[0]==1 || ohiQ[0]==7 || ohiQ[0]==18 || ohiQ[0]==21 || ohiQ[0]==24)) {
			// 홀소리 글쇠를 거듭 눌러 된소리 만들기
				ohiQ[1]=1;
				ohiInsert(f,0,ohiQ);
				return;
			}
		}

		if(option.sunalae || Ko_type=='2-KPS9256' || Ko_type.substr(0,5)=='2-sun' || Ko_type=='2-Gaon26KM') {
			if((ohiQ[3]==37 || ohiQ[3]==33) && c==51) {
			// ㅕ+ㅣ→ㅖ, ㅑ+ㅣ→ㅒ
				ohiQ[4]=1;
				ohiInsert(f,0,ohiQ);
				return;
			}
		}

		if((!ohiQ[4] || ohiQ[6] || !(ohiQ[3]=-1)) && !ohiQ[6]) ohiQ[4]=ohiDoubleJamo(1,ohiQ[3],c);
		if((ohiQ[0] && ohiQ[3]>0 && ohiQ[6]) && (ohiQ[7] || !(ohiQ[7]=ohiQ[6]) || !(ohiQ[6]=0))) {
			ohiInsert(f,0,[ohiQ[0],ohiQ[1],0,ohiQ[3],ohiQ[4],0,ohiQ[6],0,0]);
			ohiInsert(f,ohiQ,ohiQ=[ohiQ[7],0,0,c,0,0,0,0,0]);
		}
		else if((!ohiQ[0] || ohiQ[3]) && (!ohiQ[4] || ohiQ[6]) || ohiQ[3]<0) ohiInsert(f,ohiQ,ohiQ=[0,0,0,c,0,0,0,0,0]);
		else if(ohiQ[3]=ohiQ[3]||c) ohiInsert(f,0,ohiQ);
	}
}

function seek_abbreviation(ieochigi_hangeul_abbreviation_table, c1, c2) { // 줄임말 조합을 찾기 (이어치기 자판)
	var i;
	var chars=null;

	for(i=0; i<ieochigi_hangeul_abbreviation_table.length; ++i) {
		if(abbreviation_table[i].phonemes[0]==convert_into_unicode_hangeul_phoneme(c1) && ieochigi_hangeul_abbreviation_table[i].phonemes[1]==convert_into_unicode_hangeul_phoneme(c2)) {
			return ieochigi_hangeul_abbreviation_table[i].chars;
		}
	}
	return null;
}

function ohiHangeul3_abbreviation(f,e,key) { // 이어치기 세벌식 자판에서 줄임말 처리
	if(!option.abbreviation || typeof current_layout.ieochigi_hangeul_abbreviation_table == 'undefined') return 0;

	var i,j;
	var c=current_layout.layout[key-33];
	var ch, chars;
	var ieochigi_hangeul_abbreviation_table=null;

	abbreviation_table = current_layout.ieochigi_hangeul_abbreviation_table;
	if(!abbreviation_table || !abbreviation_table.length) return 0;

	if(!prev_phoneme.length) {
		if(ohiQ[6]) ch=ohiQ[6]+ohiQ[7];
		else if(ohiQ[3]) ch=ohiQ[3]+ohiQ[4]+35;
		else if(ohiQ[0]) ch=ohiQ[0]+ohiQ[1]+127;

		chars=seek_abbreviation(abbreviation_table, convert_into_unicode_hangeul_phoneme(ch), convert_into_unicode_hangeul_phoneme(c));

		if(chars) {
			ohiBackspace(f);
			insert_chars(f,chars);
			return 1;
		}
	}
	return 0;
}

function ohiHangeul3(f,e,key) { // 세벌식 자판 - 낱자 단위 처리
	var i, j, c1=0, c2=0;
	var layout=current_layout.layout;
	var sublayout=null;
	var extended_sign_layout=null;

	if(option.enable_old_hangeul_input) {
		if(typeof current_layout.old_hangeul_layout_type_name != 'undefined') {
			layout = find_layout_info('Ko', current_layout.old_hangeul_layout_type_name).layout;
		}
	}

	if(!abbriviation_processing_state) {
		if(typeof current_layout.sublayout != 'undefined') sublayout = current_layout.sublayout;
		if(typeof current_layout.extended_sign_layout != 'undefined') extended_sign_layout = current_layout.extended_sign_layout;
	}

	if(unicode_cheos.indexOf(key)>=0 || unicode_ga.indexOf(key)>=0 || unicode_ggeut.indexOf(key)>=0) {
	// key가 유니코드 한글 낱자일 때
		c1=key;
	}
	else if(layout) {
		c1=layout[key-33];
		c2=layout[shift_table[key-33]-33]; // 윗글 자리
	}

	if( (c1>64 && c1<91 || c1>96 && c1<123) && !(option.enable_sign_ext && sign_ext_state && extended_sign_layout)) {
	// 아스키 영역의 영문자들을 한글 낱자로 처리하지 않고 그대로 넣기 위함 (기호 확장 배열을 쓰지 않을 때)
		if(prev_phoneme.length) complete_hangeul_syllable(f);
		ohiInsert(f,0,c1);
		return c1;
	}

	if(!is_old_hangeul_input()) {
		// 요즘한글 자판일 때에 첫가끝 방식으로 처리하지 않게 함
		c1=convert_into_ohi_hangeul_phoneme(c1);
		c2=convert_into_ohi_hangeul_phoneme(c2);
	}

	if(!abbriviation_processing_state || is_moachigi_input()) {
		if(Ko_type.substr(0,1)=='3') {
			if(Hangeul3_sign_ext(f,e,key)) return 0; // 기호 확장 배열
			if(c1<=0) return 0;
		}

		if(is_old_hangeul_input()) {
			if(Ko_type.substr(0,5)=='Sin3-') { // 옛한글 신세벌식 자판
				c1=CGG_Hangeul_Sin3(f,e,key);
				if(c1==-1) return 0;
			}
			CGG_yesHangeul(f,key,c1); // 첫가끝 조합형으로 옛한글 낱자 처리하기
			return 0;
		}

		if(Ko_type.substr(0,5)=='Sin3-') { // 요즘한글 신세벌식 자판
			c1=Hangeul_Sin3(f,e,key);
			if(c1==-1) return 0;
		}
		else if(Ko_type.substr(1,2)=='t-') { // 타자기 자판
			c1=hangeul_typewriter(f,key);
			if(c1<=0) return 0;
		}

		if(!is_old_hangeul_input() && (ohiQ[3]==86-35) && !ohiQ[4] && !ohiQ[6] && no_shift(key) && c1==67 && c2==69) {
		// 요즘한글 배열에서 ㅣ가 들어간 뒤에 ㅐ가 눌렸을 때 ㅣ+ㅐ→ㅒ (ㅒ가 ㅐ의 윗글 자리에 있을 때만)
			ohiQ[4]=ohiQ[3]-68;
			ohiInsert(f,0,ohiQ);
			return 1;
		}

		if(Ko_type.substr(0,5)!='Sin3-' && is_galmadeuli_input()) {
		// 갈마들이 공세벌식 배열들을 위한 처리
			c1=Hangeul_Gong3_gm(f,key);
			if(c1<=0) return 0;
		}

		if(!is_old_hangeul_input() && Ko_type.substr(1,2)!='t-' && !is_moachigi_input() && 
		 (typeof current_layout.hangeul_combination_table != 'undefined' || typeof current_layout.moachigi_hangeul_combination_table != 'undefined' || typeof current_layout.hangeul_convenience_combination_table != 'undefined')
		) {
		// 옛한글 자판이 아니고 타자기 자판이 아닐 때 낱자 결합 규칙 적용하기
			var ch;
			if(ohiQ[6]) ch=ohiQ[6]+ohiQ[7];
			else if(ohiQ[3]) ch=ohiQ[3]+ohiQ[4]+35;
			else if(ohiQ[0]) ch=ohiQ[0]+ohiQ[1]+127;

			ch=combine_unicode_hangeul_phoneme(convert_into_unicode_hangeul_phoneme(ch),convert_into_unicode_hangeul_phoneme(c1));
			if(ch) {
				if(ohiQ[6]) {
					if(!ohiQ[7]) ohiQ[7]=convert_into_ohi_hangeul_phoneme(ch)-ohiQ[6];
					else { // 3타로 넣는 받침이 들어갔을 때(순아래 2014 자판의 ㄹ+ㅁ+ㅁ→ㄿ, 이어치기 방식으로 쓰는 모아치기 자판)
						ohiQ[8]=convert_into_ohi_hangeul_phoneme(ch)-(ohiQ[6]+ohiQ[7]);
					}
				}
				else if(ohiQ[3]) {
					if(!ohiQ[4]) ohiQ[4]=convert_into_ohi_hangeul_phoneme(ch)-ohiQ[3]-35;
					else { // 3타로 넣는 홀소리가 들어갔을 때 (이어치기 방식으로 쓰는 모아치기 자판 ㅗ+ㅏ+ㅣ→ㅙ)
						ohiQ[5]=convert_into_ohi_hangeul_phoneme(ch)-(ohiQ[3]+ohiQ[4])-35;
					}
				}
				else {
					if(!ohiQ[1]) ohiQ[1]=convert_into_ohi_hangeul_phoneme(ch)-ohiQ[0]-127;
					else { // 3타로 넣는 첫소리가 들어갔을 때
						ohiQ[2]=convert_into_ohi_hangeul_phoneme(ch)-(ohiQ[0]+ohiQ[1])-127;
					}
				}
				ohiInsert(f,0,ohiQ);
				return ch;
			}
		}

		// 몇몇 공병우 세벌식 자판에서 첫소리만 들어간 채로 [ 자리 글쇠가 눌렸을 때 아래아를 넣음
		if(Ko_type.substr(0,2)=='3-' && Ko_type!='3-sun1990' && Ko_type!='3-91_noshift') {
			if(key==0x5B && ( (ohiQ[0]&&!ohiQ[3]&&!ohiQ[6] || unicode_cheos.indexOf(prev_combined_phoneme[0])>=0 ) || prev_combined_phoneme[0]==0x119E)) {
				c1=0x119E;
			}
		}

		// 3-91 조합 순아래 자판
		if(Ko_type=='3-91_noshift') {
			if(key==0x5B && ( (ohiQ[0]&&ohiQ[3]&&!ohiQ[6] || unicode_ga.indexOf(prev_combined_phoneme[0])>=0) )) {
			// 첫소리와 가운뎃소리까지 들어간 채로 [ 자리 글쇠가 눌렸을 때 
				c1=0x11ff;
			}
		}
	}

	// 요즘한글 자판에 옛한글 낱자를 쓰는 변칙 낱자 조합
	if(Ko_type.substr(-2)!='-y') {
		if(unicode_ggeut.indexOf(c1)>=0 && unicode_modern_ggeut.indexOf(c1)<0) {			
			if(!ohiQ[6]) {
				ohiQ[6]=c1;
				return 1;
			}
		}
	}

	if(option.phonemic_writing && !is_old_hangeul_input() && is_galmadeuli_input()) {
	// 갈마들이 자판으로 풀어쓰기 처리
		if( (ohiQ[3] || ohiQ[6]) && (c1>127 && c1<158 && c1!=147 || ohi_hangeul_phoneme.indexOf(c1)<0) ) {
			convert_syllable_into_phonemes(f);
		}
	}

	// 요즘한글 자판에서 옛한글 홀소리가 들어갔을 때
	if(!prev_phoneme.length && !is_old_hangeul_input() && ohi_ga.indexOf(c1)<0 && unicode_ga.indexOf(c1)>=0) {
		backup_ohiQ = ohiQ.slice(0);
		backup_ohiRQ = ohiRQ.slice(0);

		if(!ohiQ[0] && !ohiQ[3] && !ohiQ[6]) {
		// 한글 조합 상태가 아니면 첫소리 채움 문자 넣음
			prev_combined_phoneme.push(c1,0x115F);
			ohiInsert(f,0,0x115F);
			ohiInsert(f,0,prev_phoneme[0]);
			ohiSelection(f,prev_combined_phoneme.length);
			return 1;
		}

		if(ohiQ[0] && !ohiQ[3] && !ohiQ[6])	{
		// 첫소리만 들어 있을 때
			prev_phoneme.unshift(c1,unicode_cheos[ohi_cheos.indexOf(ohiQ[0]+ohiQ[1]+127)]);
			prev_combined_phoneme.unshift(c1,unicode_cheos[ohi_cheos.indexOf(ohiQ[0]+ohiQ[1]+127)]);
			ohiBackspace(f);
			ohiInsert(f,0,prev_combined_phoneme[1]);
			ohiInsert(f,0,prev_combined_phoneme[0]);
			ohiSelection(f,prev_combined_phoneme.length);
			return 1;
		}

		if(ohiQ[3] || ohiQ[6]) {
		// 가운뎃소리나 끝소리가 들어 있을 때
			prev_phoneme.push(c1);
			prev_combined_phoneme.push(c1,0x115F);
			ohiInsert(f,0,0x115F); // 첫소리 채움 문자 넣음
			ohiInsert(f,0,c1);
			ohiSelection(f,prev_combined_phoneme.length);
			return 1;
		}
	}
	// 요즘한글 자판으로 요즘한글 넣기
	else if(c1>127 && c1<158 && c1!=147) { // Cho
		if(prev_phoneme.length) {
			ohiSelection(f,0);
			prev_phoneme.splice(0);
			prev_combined_phoneme.splice(0);
			prev_phoneme_R.splice(0);
		}

		i=ohiQ[1]||ohiQ[3]||!ohiDoubleJamo(0,ohiQ[0],c1-127);
		if(!i) ohiQ=0;
		ohiInsert(f,i,ohiQ=[c1-127,ohiQ?0:1,0,0,0,0,0,0,0]);
		return i;
	}
	else if(!prev_phoneme.length && c1>65 && c1<87) { // Jung
		if((!ohiQ[4] || !(ohiQ[3]=-1)) && !(Ko_type.substr(1,2)=='t-' && ohiRQ[3]+ohiRQ[4]>1)) {
			ohiQ[4]=ohiDoubleJamo(1,ohiQ[3],c1-35);
			i=1;
		}
		else i=0;

		if((!ohiQ[0] || ohiQ[3]) && (!ohiQ[4] || ohiQ[6]) || ohiQ[3]<0) {
			ohiInsert(f,ohiQ,ohiQ=[0,0,0,c1-35,0,0,0,0,0]);
			i=0;
		}
		else if(ohiQ[3]=ohiQ[3]||c1-35) {
			ohiInsert(f,0,ohiQ);
			i=1;
		}
		return i;
	}
	else if(!prev_phoneme.length && c1<31) { // Jong
		i=0;
		if(!current_layout.hangeul_combination_table && (!ohiQ[7] || !(ohiQ[6]=-1))) {
			ohiQ[7]=ohiDoubleJamo(2,ohiQ[6],c1);
			if(ohiQ[7]) i=1;
		}

		if(!ohiQ[0] || !ohiQ[3] || ohiQ[6] && !ohiQ[7] || ohiQ[6]<0 || (Ko_type.substr(0,3)=='4t-' && ohiRQ[3]+ohiRQ[4]>0)) {
			ohiInsert(f,ohiQ,ohiQ=[0,0,0,0,0,0,c1,0,0]);
			i=0;
		}
		else if(ohiQ[6]=ohiQ[6]||c1) {
			ohiInsert(f,0,ohiQ);
			i=1;
		}

		return i;
	}

	ohiInsert(f,0,c1);

	return 0;
}

function convert_syllable_into_phonemes(f) {
// 낱내를 낱자로 풀어 넣기 (풀어쓰기)
	var c,i;
	var single_phonemes=[], hangeul_conversion_function;
//	k = option.phonemic_writing_in_halfwidth_letter ? 0xFFA0 : 0x3130;
	if(option.phonemic_writing_in_halfwidth_letter) hangeul_conversion_function = convert_into_halfwidth_hangeul_letter;
	else hangeul_conversion_function = convert_into_compatibility_hangeul_letter;
	backup_ohiQ = ohiQ.slice(0);
	ohiInsert(f,0,0);
	ohiBackspace(f);

	for(i=0;i<3;++i) {
		if(!backup_ohiQ[i*3]) continue;
		if(option.phonemic_writing_in_single_phoneme) {
			single_phonemes = convert_into_single_phonemes(convert_into_unicode_hangeul_phoneme(backup_ohiQ[i*3]+backup_ohiQ[i*3+1]+backup_ohiQ[i*3+2]+(i==1?35:0)));
			if(single_phonemes.length) {
			// 겹낱자를 홑낱자로 풀어 넣기	
				ohiInsert(f,0,hangeul_conversion_function(single_phonemes[0]));
				ohiInsert(f,0,hangeul_conversion_function(single_phonemes[1]));
				continue;
			}
		}
		c = 0x3130+backup_ohiQ[i*3]+backup_ohiQ[i*3+1]+backup_ohiQ[i*3+2];
		if(option.phonemic_writing_in_halfwidth_letter) c = convert_into_halfwidth_hangeul_letter(c);
		ohiInsert(f,0,c);
	}
}

function ohiHangeul3_moa(f,e) { // 모아치기 세벌식 자판 처리
	var i,j,k,l,m;
	var c;
	var layout=current_layout.layout;
	var extended_sign_layout;
	var combination_table;

	var pressed_chars = [];
	var temp_pressed_chars = [];
	var special_keys = [32,13,8]; // 사이띄개(32), 줄바꾸개(13), 뒷걸음쇠(8)

	var chars=[];
	var cheos = [], ga = [], ggeut = [];
	var front_etc = [], rear_etc = [];
	var front_special = [], rear_special = [];

	var necessary_backspaces_cheos=0;
	var necessary_backspaces_ga=0;
	var necessary_backspaces_ggeut=0;
	var necessary_backspaces_sign=0;

	for(i=0;i<pressed_keys.length;++i) {
		// 특수 글쇠를 추림
		if(special_keys.indexOf(pressed_keys[i])>=0) {
			if(!i) front_special.push(pressed_keys[0]);
			else rear_special.push(pressed_keys[i]);
			pressed_keys.splice(i,1);
		}
		else pressed_chars.push(convert_into_unicode_hangeul_phoneme(layout[pressed_keys[i]-33]));
	}

	if(option.enable_sign_ext && typeof current_layout.extended_sign_layout != 'undefined' && sign_ext_state) {
		// 기호 확장 배열에서 기호를 넣음
		if(Hangeul3_sign_ext(f,e,pressed_keys[0])) pressed_keys.splice(0,1);
		if(pressed_keys.length>1) esc_ext_layout();
	}

	if(typeof current_layout.moachigi_multikey_abbreviation_table != 'undefined') {
	// 모아치기 글쇠 기준 줄임말·예외 조합 (모아치기 조합 가운데 가장 먼저 적용됨)
		combination_table = current_layout.moachigi_multikey_abbreviation_table;

		for(i=0;i<combination_table.length;++i) {
			if(pressed_keys.length != combination_table[i].keys.length ) continue;
			for(j=0;j<combination_table[i].keys.length;++j) {
				if(pressed_keys.indexOf(combination_table[i].keys[j].charCodeAt(0))<0) break;
			}

			if(j!=combination_table[i].keys.length) continue;
			if(combination_table[i].chars.length==1 && combination_table[i].chars[0]<0) {
				// 기호 확장 배열 상태로 들어감
				Hangeul3_sign_ext(f,e,combination_table[i].chars[0]);
				return;
			}
			insert_chars(f,combination_table[i].chars);
			return;
		}
	}

	if(typeof current_layout.moachigi_hangeul_abbreviation_table != 'undefined') {
	// 모아치기 한글 낱자 기준 줄임말·예외 조합
		combination_table = current_layout.moachigi_hangeul_abbreviation_table;

		for(i=0;i<combination_table.length;++i) {
			if(pressed_chars.length != combination_table[i].phonemes.length) continue;
			for(j=0;j<combination_table[i].phonemes.length;++j) {
				if(pressed_chars.indexOf(combination_table[i].phonemes[j])<0) break;
			}

			if(j!=combination_table[i].phonemes.length) continue;
			insert_chars(f,combination_table[i].chars);
			return;
		}
	}

	if(typeof current_layout.moachigi_hangeul_combination_table != 'undefined') {
	// 모아치기 한글 낱자 조합 규칙 (낱자 차례를 따지지 않음)
		combination_table = current_layout.moachigi_hangeul_combination_table;

		for(i=0;i<combination_table.length;++i) {
			temp_pressed_chars = pressed_chars.slice(0);
			for(j=0;j<combination_table[i].phonemes.length;++j) {
				k=temp_pressed_chars.indexOf(combination_table[i].phonemes[j]);
				if(k<0) break;
				temp_pressed_chars.splice(k,1);
			}
			if(j!=combination_table[i].phonemes.length) continue;

			chars.push(combination_table[i].char);

			for(j=0;j<combination_table[i].phonemes.length;++j) {
				k=pressed_chars.indexOf(combination_table[i].phonemes[j]);
				pressed_keys.splice(k,1);
				pressed_chars.splice(k,1);
			}
		}
	}

	for(i=0;i<pressed_keys.length;++i) {
		if(special_keys.indexOf(pressed_keys[i])>=0) c=pressed_keys[i];
		else c=convert_into_unicode_hangeul_phoneme(layout[pressed_keys[i]-33]);
		chars.push(c);
	}
	
	for(i=0;i<front_special.length;++i) {
		c=front_special[i];

		if(c==8) { // 뒷걸음쇠(backspace)
			if(!ohiHangeul_moa_backspace(f,e)) continue;
			if(e.preventDefault) e.preventDefault();
			ohiBackspace(f);
		}
		else ohiInsert(f,0,c);

		if(c==13) { // 줄바꾸개(enter)
			ohiInsert(f,0,32);
			ohiBackspace(f);
		}
	}

	for(i=0;i<chars.length;++i) {
		c=chars[i];
		if(!i && special_keys.indexOf(c)>=0) {
			special.push(c);
			continue;
		}

		if(option.phonemic_writing && option.phonemic_writing_in_single_phoneme) {
			var a=convert_into_single_phonemes(c);
			if(a.length) {
				for(j=0;j<a.length;++j) chars.splice(i+j, !j?1:0, a[j]);
				c=a[0];
			}
		}

		if(unicode_cheos.indexOf(c)>=0) {
			cheos.push(c);
		}
		else if(unicode_ga.indexOf(c)>=0) {
			ga.push(c);
		}
		else if(unicode_ggeut.indexOf(c)>=0) {
			ggeut.push(c);
		}
		else {
			if(!cheos.length && !ga.length && !ggeut.length) front_etc.push(c);
			else rear_etc.push(c);
		}
	}

	backspaces_for_restoring_prev_state=0;

	for(i=0;i<front_etc.length;++i) {
		ohiInsert(f,0,front_etc[i]);
	}

	insert_chars(f,cheos.concat(ga,ggeut));

	for(i=0;i<rear_etc.length;++i) {
		backspaces_for_restoring_prev_state=0;
		ohiInsert(f,0,rear_etc[i]);
	}

	for(i=0;i<rear_special.length;++i) {
		c=rear_special[i];
		backspaces_for_restoring_prev_state=0;

		if(c==8) { // 뒷걸음쇠(backspace)
			if(!ohiHangeul_moa_backspace(f,e)) {
				backspaces_for_restoring_prev_state=0;
				continue;
			}
			if(e.preventDefault) e.preventDefault();
			ohiBackspace(f);
		}
		else {
			ohiInsert(f,0,c);
		}

		if(c==13) { // 줄바꾸개(enter)
			ohiInsert(f,0,32);
			ohiBackspace(f);
		}
	}
}

function insert_chars(f,combination_table_chars) { // 여러 문자를 넣음 (줄임말을 넣을 때)
	if(typeof combination_table_chars == 'undefined' || typeof combination_table_chars.length == 'undefined') return;
	var chars = combination_table_chars.slice();
	var a=[],h=0,i,j,k,l;
	backspaces_for_restoring_prev_state=0;
	abbriviation_processing_state=1;

	if(option.phonemic_writing && option.phonemic_writing_in_single_phoneme) {
		for(i=0;i<chars.length;++i) {
			a=convert_into_single_phonemes(chars[i]);
			if(a.length) {
				for(j=0;j<a.length;++j)	chars.splice(i+j, !j?1:0, a[j]);
			}
		}
	}

	for(i=0;i<chars.length;++i) {
		if(unicode_CGG_hangeul_phoneme.indexOf(chars[i])>=0) {
			for(j=0,k=0; j<ohiQ.length; ++j) {
				if(ohiQ[j]) ++k;
			}

			if(option.phonemic_writing && option.phonemic_writing_in_halfwidth_letter) {
				chars[i]=convert_into_halfwidth_hangeul_letter((chars[i]));
				ohiInsert(f,0,chars[i]);
			}
			else {
				ohiHangeul3(f,0,chars[i]);
			}

			for(j=0,l=0; j<ohiQ.length; ++j) {
				if(ohiQ[j]) ++l;
			}

			if(!k) {
				++h;
			}
			else if(k>=1&&l==1 || !i&&(ohiQ[1] || ohiQ[3] || ohiQ[6])) {
			// 한글 조합이 끊기고 새로 시작되거나 첫 타에 한글 조합이 끊기지 않았을 때
				h=1;
				if(i) ++backspaces_for_restoring_prev_state;
			}
			else {
				++h;
			}
		}
		else {
			ohiInsert(f,0,chars[i]);
			if(h && Ko_type.substr(0,3)=='3m-') {
				++backspaces_for_restoring_prev_state;
			}
			h=0;
			++backspaces_for_restoring_prev_state;
		}
	}

	backspaces_for_restoring_prev_state += h;
	abbriviation_processing_state = 0;
}


function Hangeul3_sign_ext(f,e,key) {
	var c;
	if(!option.enable_sign_ext || current_layout.extended_sign_layout === undefined || current_layout.extended_sign_layout == null) return 0;

	if(Ko_type.substr(0,3)=='3m-') { // 세모이 자판을 비롯한 모아치기 자판
		c=current_layout.layout[key-33];
		if(sign_ext_state>0) {
		// 기호 확장 배열에서 기호를 넣음
			c=current_layout.extended_sign_layout[key-33][sign_ext_state-1];
			ohiInsert(f,0,c);
			esc_ext_layout();
			return 1;
		}
		else if(key<0 && key>-4) {
		// 기호 확장 배열로 들어감
			sign_ext_state=-key;
			show_keyboard_layout();
			return 0;
		}
		esc_ext_layout();
		return 0;
	}

	// 3-2011, 3-2012 특수기호 확장 배열
	if(!is_old_hangeul_input() && (Ko_type=='3-2011' || Ko_type=='3-2012')) {
		if((key==118 || key==56) && ( !prev_phoneme.length&&(!ohiQ[0]&&!ohiQ[3] || ohiQ[3]) || prev_phoneme.length&&unicode_cheos.indexOf(prev_combined_phoneme[0])<0&&(unicode_ga.indexOf(prev_combined_phoneme[0])>=0 || unicode_ggeut.indexOf(prev_combined_phoneme[0])>=0)) ) {
		// 3-2011, 3-2012 자판의 왼쪽 특수기호 확장 글쇠(ㅗ·ㅢ)가 눌린 횟수 더하기
			if(key==118) { // 왼쪽 ㅗ
				if(sign_ext_state<10) ++sign_ext_state;
				else sign_ext_state+=2;
			}
			if(key==56) { // 오른쪽 ㅢ
				if(!sign_ext_state) sign_ext_state=10;
				if(sign_ext_state>=10) ++sign_ext_state;
				else sign_ext_state+=2;
			}
			if(sign_ext_state%10>3)	sign_ext_state=0;
			show_keyboard_layout(Ko_type);
			return 1;
		}

		if(sign_ext_state) {
			if(prev_phoneme.length)	complete_hangeul_syllable(f);
			c1=current_layout.extended_sign_layout[key-33][sign_ext_state%10-1];
			ohiInsert(f,0,c);
			esc_ext_layout();
			return 1;
		}
	}

	var sign_layout = current_layout.extended_sign_layout;
	if(is_old_hangeul_input() && typeof current_layout.old_hangeul_layout_type_name != 'undefined') {
		if(typeof find_layout_info('Ko', current_layout.old_hangeul_layout_type_name).sign_layout != 'undefined')
			sign_layout = find_layout_info('Ko', current_layout.old_hangeul_layout_type_name).sign_layout;
	}

	if(!ohiHangeul3_HanExtKey && (key==0x2F || key==0x39)
	 && (((!ohiQ[0]&&!ohiQ[3] || ohiQ[3] || ohiQ[0]&&(key==0x2F || key==0x39) && sign_ext_state)
	 && ((unicode_cheos.indexOf(prev_phoneme[0])<0&&unicode_ga.indexOf(prev_phoneme[0])<0&&unicode_ggeut.indexOf(prev_phoneme[0])<0) || unicode_ga.indexOf(prev_phoneme[0])>=0 || unicode_ggeut.indexOf(prev_phoneme[0])>=0)))
	) { // 나머지 공세벌식 자판의 기호 확장 글쇠가 눌린 횟수 더하기
		if(ohiRQ[3] && !ohiQ[4] && !ohiQ[6] && (ohiQ[3]==39 || ohiQ[3]==44)) {
			// 받침이 들어가지 않은 때에 오른쪽 ㅗ 또는 ㅜ 자리 글쇠가 두 번 눌리면 ㅗ 또는 ㅜ를 지움 (첫소리 다음에 확장 기호를 넣기 위함)
			ohiRQ[3]=0;
			ohiHangeul_backspace(f,e);
		}
		var i,j,k,l,sign_layout_depth=[0,0];
		if(sign_layout[0].constructor == Array) {
			for(i=0;i<sign_layout.length;++i) {
				for(j=0;j<2;++j) {
					if(sign_layout[i][j].constructor != Array) continue;
					for(k=sign_layout_depth[j];k<sign_layout[i][j].length;++k) {
						if(sign_layout[i][j][k] && k+1 > sign_layout_depth[j]) sign_layout_depth[j] = k+1;
					}
				}
			}
		}

		if(key==0x2F && sign_ext_state%10<sign_layout_depth[0]) {	// 밑기호 글쇠(오른쪽 ㅗ)가 눌렸을 때
			if(sign_ext_state>10) esc_ext_layout();
			++sign_ext_state;
			if(sign_ext_state>sign_layout_depth[0]) esc_ext_layout();
			else show_keyboard_layout(Ko_type);
			return 1;	
		}
		if(key==0x39 && sign_ext_state%10<sign_layout_depth[1]) {	// 윗기호 글쇠(오른쪽 ㅜ)가 눌렸을 때
			if(sign_ext_state<11) {esc_ext_layout(); sign_ext_state=10;}
			++sign_ext_state;
			if(sign_ext_state%10>sign_layout_depth[1]) esc_ext_layout();
			else show_keyboard_layout(Ko_type);
			return 1;
		}
	}

	if(sign_ext_state) {
	// 나머지 공세벌식 자판의 기호 확장 배열
		if(sign_layout[key-33].constructor == Array) {
			if(sign_ext_state<11) c=sign_layout[key-33][0][sign_ext_state-1];
			if(sign_ext_state>10) c=sign_layout[key-33][1][sign_ext_state%10-1];
		}
		else {
			c=sign_layout[key-33];
		}
		if(prev_phoneme.length && key!=8) complete_hangeul_syllable(f);

		// 옛한글 자판이 아닐 때 옛한글 방점에 한글 채움 문자를 더하여 넣음
		if((c==0x302E || c==0x302F) && !is_old_hangeul_input()) {
				ohiInsert(f,0,0x115F);
				ohiInsert(f,0,0x1160);
		}

		ohiInsert(f,0,c);
		prev_phoneme.splice(0);
		prev_phoneme_R.splice(0);
		prev_combined_phoneme.splice(0);
		esc_ext_layout();
		return 1;
	}
	return 0;
}

function CGG_yesHangeul(f,key,c) {	// 세벌식 옛한글 처리
	ohiSelection(f,0);

	var diphthong=0; // 겹홀소리의 첫 홀소리인지 (신세벌식)
	if(c<0) {
		c=-c;
		diphthong=1;
	}

	if(!is_old_hangeul_input()) c=convert_into_unicode_hangeul_phoneme(c);

	if(is_old_hangeul_input() && (Ko_type.substr(0,6)=='3-2011' || Ko_type.substr(0,6)=='3-2012' || Ko_type.substr(0,6)=='3-2014' || Ko_type.substr(0,7)=='3-2015P')) {
	// 전환 글쇠를 쓰는 한글 확장 배열 처리
		if(key==55 || c==0x1168) {	// 첫째 한글 확장 글쇠(ㅖ 자리 글쇠)가 눌렸을 때
			if(ohiHangeul3_HanExtKey%0x10==2 || ohiHangeul3_HanExtKey==0x11) { esc_ext_layout(); complete_hangeul_syllable(f); return false;}
			if(ohiHangeul3_HanExtKey>0x10) {esc_ext_layout(); return false;}
			ohiHangeul3_HanExtKey = (ohiHangeul3_HanExtKey&&ohiHangeul3_HanExtKey)*0x10+1;
			show_keyboard_layout('3-2012y_han_ext');
			return false;
		} else if(key==56 || c==0x1174) { // 두째 한글 확장 글쇠(ㅢ 자리 글쇠)가 눌렸을 때
			if(ohiHangeul3_HanExtKey%0x10==1 || ohiHangeul3_HanExtKey==0x12) { esc_ext_layout(); complete_hangeul_syllable(f); return false;}
			if(ohiHangeul3_HanExtKey>0x10) {esc_ext_layout(); return false;}
			ohiHangeul3_HanExtKey = (ohiHangeul3_HanExtKey&&ohiHangeul3_HanExtKey)*0x10+2;
			show_keyboard_layout('3-2012y_han_ext');
			return false;
		}

		if(ohiHangeul3_HanExtKey) { // 한글 확장 배열에서 넣기
			layout = K3_2012y_extended_hangeul_layout;
			c=layout[key-33][ohiHangeul3_HanExtKey%0x10-1][ohiHangeul3_HanExtKey/0x10];
			c=layout[key-33][ohiHangeul3_HanExtKey%0x10-1][ohiHangeul3_HanExtKey>0x10 ? 1:0];
		}
	}

	if(prev_combined_phoneme[0]==0x1160 && unicode_cheos.indexOf(prev_combined_phoneme[1])>=0 && unicode_CGG_hangeul_phoneme.indexOf(c)>=0 ) {
	// 바로 앞서 첫소리만 들어 왔고 한글 낱자가 들어왔다면 가운뎃소리 채움 문자를 지움
		ohiBackspace(f);
		prev_combined_phoneme.splice(0,1);
	}

	var combination_table=hangeul_combination_table_full;
	if(typeof current_layout.hangeul_combination_table != 'undefined') combination_table=current_layout.hangeul_combination_table;

	var combined_phoneme=combine_unicode_hangeul_phoneme(prev_combined_phoneme[0],c);

	// 앞 낱자와 조합하지 않는 첫소리나 한글이 아닌 문자가 들어왔을 때에 조합을 끊고 앞 낱내를 요즘한글 방식 코드로 바꿈
	if(!combined_phoneme&&unicode_cheos.indexOf(c)>=0 || unicode_cheos.indexOf(c)<0&&unicode_ga.indexOf(c)<0&&unicode_ggeut.indexOf(c)<0) {
		if(unicode_cheos.indexOf(prev_phoneme[0])>=0) {
		// 첫소리만 들어 있었으면 가운뎃소리 채움 문자를 넣음
			ohiInsert(f,0,0x1160);
			prev_combined_phoneme.unshift(0x1160);
		}
		complete_hangeul_syllable(f);
	}
	
	if(key==0x5B && unicode_cheos.indexOf(prev_phoneme[0])>=0 && !ohiHangeul3_HanExtKey) { // 첫소리가 들어간 채로 [ 자리 글쇠가 눌렸을 때 아래아를 넣음
		c=0x119E;
	}
	else if(!combined_phoneme && unicode_ga.indexOf(c)>=0 && unicode_cheos.indexOf(prev_phoneme[0])<0) {
	// 앞에 첫소리 없이 가운뎃소리가 들어왔을 때
		complete_hangeul_syllable(f);
		ohiInsert(f,0,0x115F); // 첫소리 채움 문자 넣음
		prev_combined_phoneme.splice(0);
		prev_combined_phoneme.unshift(0x115F);
	}
	else if(!combined_phoneme && unicode_ggeut.indexOf(c)>=0) {
	// 끝소리가 들어왔을 때
		if(unicode_cheos.indexOf(prev_phoneme[0])>=0) {
		// 바로 앞에 첫소리가 들어왔다면 가운뎃소리 채움 문자 넣음
			ohiInsert(f,0,0x1160);
			prev_combined_phoneme.unshift(0x1160);
		}
		else if(unicode_cheos.indexOf(prev_phoneme[0])<0 && unicode_ga.indexOf(prev_phoneme[0])<0/* && prev_combined_phoneme[0]!=0x115F && prev_combined_phoneme[0]!=0x1160*/) {
		// 바로 앞에 첫소리도 가운뎃소리도 끝소리도 채움 문자도 들어오지 않았을 때
			complete_hangeul_syllable(f);
			ohiInsert(f,0,0x115F);
			ohiInsert(f,0,0x1160); // 가운뎃소리 채움 문자
			prev_combined_phoneme.unshift(0x1160,0x115F);
		}
	}

	prev_phoneme.unshift(c);
	prev_phoneme_R.unshift(diphthong);

	if(combined_phoneme) {
		prev_combined_phoneme[0] = combined_phoneme;
		ohiBackspace(f);
		ohiInsert(f,0,combined_phoneme);
	}
	else {
		prev_combined_phoneme.unshift(c);
		ohiInsert(f,0,c);
	}

	if(unicode_cheos.indexOf(c)>=0) {
	// 첫소리가 들어왔을 때 가운뎃소리 채움 문자 넣음
		ohiInsert(f,0,0x1160);
		prev_combined_phoneme.unshift(0x1160);
	}

	esc_ext_layout();

	if(prev_combined_phoneme.length && unicode_CGG_hangeul_phoneme.indexOf(c)>=0) {
		ohiSelection(f,prev_combined_phoneme.length);
	}
}

function Hangeul_Sin3(f,e,key) { // 신세벌식
	var i, j, c1, c2;
	var Sin3_layout=current_layout.layout;
	var Sin3_sublayout=typeof current_layout.sublayout != 'undefined' ? current_layout.sublayout : null;
	var Sin3_extended_sign_layout = typeof current_layout.extended_sign_layout != 'undefined' ? current_layout.extended_sign_layout : null;
	var transform=0; // 홀소리를 아랫글 자리에 둔 바꾼꼴 신세벌식 배열인지 나타내는 변수

	// c1가 아랫글 자리이면 c2는 윗글 자리, 아니면 그 반대임
	c1=convert_into_ohi_hangeul_phoneme(Sin3_layout[key-33]);
	c2=convert_into_ohi_hangeul_phoneme(Sin3_layout[shift_table[key-33]-33]);

	// 홀소리를 아랫글 자리에 두고 받침을 윗글 자리에 두는 신세벌식 자판을 함께 처리하기 위한 작업
	if(no_shift(key) && ohi_ga.indexOf(c1)>=0 && (prev_phoneme.length || ohiQ[0]&&!ohiQ[3]&&!ohiQ[6] || ohiQ[0]&&ohiQ[3]&&!ohiQ[6] || ohiQ[0]&&ohiQ[3]&&ohiQ[6]&&!ohiQ[7])) {
		transform=1;
		[c1,c2] = [c2,c1];
	}

	if(option.enable_sign_ext && sign_ext_state && Sin3_extended_sign_layout) {
	// 신세벌식 기호 확장 배열에서 문자를 넣음
		c1=Sin3_extended_sign_layout[key-33][sign_ext_state-1];
		ohiBackspace(f);
		ohiInsert(f,0,c1);
		esc_ext_layout();
		return -1;
	}
	else if(option.enable_sign_ext && !sign_ext_state && Sin3_extended_sign_layout && ohiQ[0]==150-92-35 && (c1==128 || c1==151 || c1==145) && !ohiQ[3] && !ohiQ[6]) {
	// 신세벌식 기호 확장 배열 상태로 넘어가는 조건이 갖추어졌을 때
		if(c1==128) sign_ext_state=1;
		else if(c1==151) sign_ext_state=2;
		else if(c1==145) sign_ext_state=3;
		show_keyboard_layout('Sin3-ext');
		return -1;
	}
	else if(c2<31 && !no_shift(key) && !ohiQ[0] && !ohiQ[3] && ohiQ[6] && !ohiQ[7] && ohiDoubleJamo(2,ohiQ[6],c2)) {
	// 홑받침만 들어갔는데 윗글쇠와 함께 왼쪽 글쇠가 눌렸을 때 겹받침 조합하기
		ohiQ[7]=ohiDoubleJamo(2,ohiQ[6],c2);
		ohiInsert(f,0,ohiQ);
		return -1;
	}
	else if(option.enable_double_final_ext && Sin3_sublayout && !no_shift(key) && Sin3_sublayout[key-33] && Sin3_sublayout[key-33]
	 && (ohiQ[0] || prev_phoneme.length&&unicode_cheos.indexOf(prev_phoneme[prev_phoneme.length-1])>=0) && (ohiQ[3] && !ohiQ[6] || !no_shift(key) && prev_phoneme.length&&unicode_ga.indexOf(prev_phoneme[0])>=0)) {
	// 윗글쇠를 함께 눌렀을 때 왼쪽 윗글 자리의 겹받침 넣기 (겹받침 확장 입력)
		c1=convert_into_ohi_hangeul_phoneme(Sin3_sublayout[key-33]);
	}
	else if(no_shift(key) && ohiQ[0] && !ohiQ[3] && unicode_cheos.indexOf(convert_into_unicode_hangeul_phoneme(c1))>=0 && unicode_ga.indexOf(convert_into_unicode_hangeul_phoneme(c2))>=0) {
	// 첫소리가 들어갔을 때에 오른손 자리에 있는 겹홀소리 조합용 가운뎃소리(ㅗ, ㅜ, ㅡ, ㅢ 등) 넣기
		c1=c2;
		ohiRQ[3]=1;
	}
	else if(no_shift(key) && ohiQ[0] && !ohiQ[3] && Sin3_sublayout && unicode_ga.indexOf(convert_into_unicode_hangeul_phoneme(Sin3_sublayout[key-33]))>=0
	 /*&& Sin3_sublayout[key-33](convert_into_ohi_hangeul_phoneme(Sin3_sublayout[key-33])==74 || convert_into_ohi_hangeul_phoneme(Sin3_sublayout[key-33])==79 || convert_into_ohi_hangeul_phoneme(Sin3_sublayout[key-33]==84 || convert_into_ohi_hangeul_phoneme(Sin3_sublayout[key-33])==0x119E))*/
	) {
	// 첫소리가 들어갔고 가운뎃소리가 들어가지 않았을 때 보조 배열(sublayout)에서 겹홀소리 조합용 ㅗ, ㅜ, ㅡ, ㆍ를 넣음
		c1=convert_into_ohi_hangeul_phoneme(Sin3_sublayout[key-33]);
		ohiRQ[3]=1;
	}
	else if(key==47 && ohiQ[0] && !ohiQ[3]) {
	// 오른손 쪽 ㅋ 자리에서 ㅗ 넣기 (보조 배열에서 다른 홀소리를 따로 지정하지 않았을 때)
		c1=74;
		ohiRQ[3]=1;
	}
	else if(!ohiQ[3] && (key==79 || key==80 || key==73) && (c1==79 || c1==74 || c1==84 || c1==0x119E)) {
	// 가운뎃소리가 들어가지 않았을 때에 오른손 윗글 자리의 겹홀소리 조합용 가운뎃소리(ㅗ, ㅜ, ㅡ, ㆍ) 넣기
		ohiRQ[3]=1;
	}
	else if((ohiRQ[3] || backup_ohiRQ[3]) && c1<31 && prev_phoneme[0]==0x119E && !(prev_phoneme.length>1 && (unicode_ga.indexOf(prev_phoneme[1])>=0 || unicode_ggeut.indexOf(prev_phoneme[0])>=0))) {
	// 아래아가 들어 있을 때에 ㆎ(아래애), ᆢ(쌍아래아) 조합하기
		if(key==100) c1=0x1175; // ㆎ(아래애) 조합하기
		else if(key==122 && prev_phoneme[1]!=0x119E) c1=0x119E; // 쌍아래아(ᆢ) 조합하기
	}
	else if(c1<31 && prev_phoneme.length && unicode_ggeut.indexOf(prev_phoneme[0])>=0) {
	// 첫가끌 조합 상태에서 받침이 들어간 다음에 다시 받침이 들어왔을 때
		if(unicode_ggeut.indexOf(prev_phoneme[1])<0) {
			if(option.enable_double_final_ext && prev_phoneme[0]==convert_into_unicode_hangeul_phoneme(c1)) {
			// 같은 받침 글쇠가 거듭 눌렸을 때 겹받침 확장 배열 적용하기
				prev_phoneme.unshift(convert_into_unicode_hangeul_phoneme(c1));
				prev_phoneme_R.unshift(0);
				prev_combined_phoneme[0]=convert_into_unicode_hangeul_phoneme(Sin3_sublayout[key-33]);
				ohiBackspace(f);
				ohiInsert(f,0,convert_into_unicode_hangeul_phoneme(Sin3_sublayout[key-33]));
				return -1;
			}
			else {
			// 요즘한글에 있는 겹받침 조합인지 찾기
				for(i=0;i<hangeul_combination_table_default.length;++i) {
					if(hangeul_combination_table_default[i][0]==prev_phoneme[0]*0x10000+convert_into_unicode_hangeul_phoneme(c1)) {
						return convert_into_unicode_hangeul_phoneme(c1);
					}
				}
			}
		}
		ohiSelection(f,0);
		prev_phoneme.splice(0);
		prev_phoneme_R.splice(0);
		prev_combined_phoneme.splice(0);
	}
	else if(ohiRQ[3] && c1<31 && (ohiQ[3]==74-35 || ohiQ[3]==79-35 || ohiQ[3]==84-35) && !ohiQ[4]) {
		if(ohiQ[3]+35==74 && (c2==66 || c2==67 || c2==86)) {
		// 오른쪽 ㅗ와 겹홀소리를 이룰 수 있는 홑홀소리 (ㅏ,ㅐ,ㅣ)
			c1=c2;
		}
		else if(ohiQ[3]+35==79 && (c2==70 || c2==71 || c2==86 )) {
		// 오른쪽 ㅜ와 겹홀소리를 이룰 수 있는 홑홀소리 (ㅓ,ㅔ,ㅣ)
			c1=c2;
		}
		else if(ohiQ[3]+35==84 && c2==86) {
		// 오른쪽 ㅡ와 겹홀소리를 이룰 수 있는 홑홀소리 (ㅣ)
			c1=c2;
		}
	}
	else if(c1<31 && ohiQ[0]&&!ohiQ[3]&&!ohiQ[6] && (c2>65 && c2<87 || key==122)) { // 왼손 쪽 아랫글 자리에서 가운뎃소리 넣기
		c1=c2;
		if(key==122 && (c2==0x119E || c2>157)) c1=0x119E; // Z 자리 아래아
		ohiRQ[3]=0;
	}
	else if(option.enable_double_final_ext && Sin3_sublayout && !ohiRQ[3] && ohiQ[0] && ohiQ[3] && ohiQ[6] && !ohiQ[7] && c1==ohiQ[6] && (c2=convert_into_ohi_hangeul_phoneme(Sin3_sublayout[key-33]))) {
	// 같은 글쇠를 거듭 눌러 겹받침 넣기
		ohiQ[7]=c2-ohiQ[6];
		ohiInsert(f,0,ohiQ);
		return -1;
	}
	else if(transform && c1<31 && ohiQ[6] && !ohiQ[7]) {
	// 받침을 윗글 자리에 두는 바꾼꼴 신세벌식 자판의 두번째 들어온 받침 처리
		i=combine_unicode_hangeul_phoneme(convert_into_unicode_hangeul_phoneme(ohiQ[6]),convert_into_unicode_hangeul_phoneme(c1));
		if(!i) c1=c2;
	}

	if(option.phonemic_writing && ohiQ[6] && c1<31 && !ohiDoubleJamo(2,ohiQ[6],c1)) {
	// 풀어쓰기할 때 조합되지 않는 받침이 들어왔으면 조합하던 낱자들을 풀어 넣음
		convert_syllable_into_phonemes(f);
	}

	if(!c1) {
		ohiInsert(f,0,0);
		return -1;
	}

	return c1;
}

function CGG_Hangeul_Sin3(f,e,key) { // 첫가끝 방식으로 조합하는 신세벌식 한글 처리 (옛한글)
	var i, j, c1, c2;
	var Sin3_layout=current_layout.layout;
	var Sin3_sublayout=typeof current_layout.sublayout != 'undefined' ? current_layout.sublayout : null;
	var Sin3_extended_sign_layout = typeof current_layout.extended_sign_layout != 'undefined' ? current_layout.extended_sign_layout : null;

	// c1가 아랫글 자리이면 c2는 윗글 자리, 아니면 그 반대임
	c1=convert_into_unicode_hangeul_phoneme(Sin3_layout[key-33]);
	c2=convert_into_unicode_hangeul_phoneme(Sin3_layout[shift_table[key-33]-33]);

	if(option.enable_sign_ext && sign_ext_state) {
	// 신세벌식 기호 확장 배열에서 문자를 넣을 때
		c1=Sin3_extended_sign_layout[key-33][sign_ext_state-1];
		ohiBackspace(f);
		ohiInsert(f,0,c1);
		esc_ext_layout();
		prev_phoneme.splice(0);
		prev_phoneme_R.splice(0);
		prev_combined_phoneme.splice(0);
		return -1;
	}
	else if(option.enable_sign_ext && !sign_ext_state && prev_phoneme.length==1 && prev_phoneme[0]==0x110B/*ㅇ*/ && (c1==0x1100/*ㄱ*/ || c1==0x110C/*ㅈ*/ || c1==0x1107/*ㅂ*/)) {
	// 신세벌식 기호 확장 배열을 쓸 조건일 때
		if(c1==0x1100) sign_ext_state=1;
		else if(c1==0x110C) sign_ext_state=2;
		else if(c1==0x1107) sign_ext_state=3;
		show_keyboard_layout('Sin3-ext');
		return -1;
	}
	else if(option.enable_Sin3_diphthong_key && no_shift(key) && prev_phoneme.length && unicode_cheos.indexOf(prev_phoneme[0])>=0 && unicode_cheos.indexOf(c1)>=0 && unicode_ga.indexOf(c2)>=0) {
	// 첫소리가 들어갔을 때에 오른손 자리에 있는 겹홀소리 조합용 가운뎃소리(ㅗ, ㅜ, ㅡ, ㆍ 등) 넣기
		c1=-c2;
	}
	else if(option.enable_Sin3_diphthong_key && no_shift(key) && prev_phoneme.length && unicode_cheos.indexOf(prev_phoneme[0])>=0 && Sin3_sublayout && unicode_ga.indexOf(Sin3_sublayout[key-33])>=0) {
	// 첫소리가 들어갔고 가운뎃소리가 들어가지 않았을 때 보조 배열의 겹홀소리 조합용 홀소리를 넣음
		c1=-Sin3_sublayout[key-33];
	}
	else if(!no_shift(key) && prev_phoneme.length && unicode_cheos.indexOf(prev_phoneme[0])>=0 && unicode_ga.indexOf(c1)>=0 && unicode_ggeut.indexOf(c2)>=0) {
	// 첫소리만 들어갔고, 왼손 쪽의 끝소리가 있는 글쇠가 윗글쇠와 함께 눌렸을 때 끝소리를 넣음 (미완성 낱내 조합)
		c1=c2;
	}
	else if(option.enable_Sin3_adding_cheos_with_shift_key && !no_shift(key) && prev_phoneme.length && unicode_cheos.indexOf(prev_phoneme[0])>=0 && unicode_cheos.indexOf(c2)>=0 && (unicode_ga.indexOf(c1)>=0 || unicode_ga.indexOf(Sin3_sublayout[shift_table[key-33]-33])>=0)) {
	// 첫소리만 들어갔고, 오른손 쪽의 홀소리가 있는 첫소리 글쇠를 윗글쇠와 함께 눌렀을 때 첫소리를 넣음
		c1=c2;
	}	
	else if(option.enable_Sin3_diphthong_key && key==47 && prev_phoneme.length && unicode_cheos.indexOf(prev_phoneme[0])>=0) {
	// 오른손 쪽 첫소리 ㅋ 자리에서 ㅗ 넣기 (보조 배열에서 다른 홀소리를 따로 지정하지 않았을 때)
		c1=-0x1169;
	}
	else if((!prev_phoneme.length || unicode_ga.indexOf(prev_phoneme[0])<0) && (key==79 || key==80 || key==73) && (c1==0x1169/*ㅗ*/ || c1==0x116E/*ㅜ*/ || c1==0x1173/*ㅡ*/ || c1==0x119E/*ㆍ*/)) {
	// 가운뎃소리가 들어가지 않았을 때에 오른손 윗글 자리의 가운뎃소리(ㅗ, ㅜ, ㅡ, ㆍ) 넣기
		c1=-c1;
	}
	else if(prev_phoneme_R[0] && unicode_ga.indexOf(c2)>=0) {
	// 겹홀소리 조합용 가운뎃소리가 먼저 들어간 뒤에 홀소리 자리 글쇠가 눌렸을 때
		c1=c2;
	}
	else if(unicode_ggeut.indexOf(c1)>=0 && unicode_cheos.indexOf(prev_phoneme[0])>=0 && (unicode_ga.indexOf(c2)>=0 || key==122)) {
	// 왼손 쪽 아랫글 자리에서 가운뎃소리 넣기
		c1=c2;
		if(key==122 && (c2==0x119E || unicode_CGG_hangeul_phoneme.indexOf(c2)<0)) c1=0x119E; // Z 자리 아래아
	}

	return c1;
}


function Hangeul_Gong3_gm(f,key) {
	var c1,c2;
	var layout=current_layout.layout;
	var sublayout = typeof current_layout.sublayout != 'undefined' ? current_layout.sublayout : null;

	c1=convert_into_ohi_hangeul_phoneme(layout[key-33]);
	c2=convert_into_ohi_hangeul_phoneme(layout[key-33-32]);	// 윗글 자리

	if(!ohiQ[3]) ohiRQ[3]=0;

	if(ohiQ[3]==c1-35 && !ohiQ[4] && !ohiQ[6] && c2>65 && c2<87) {
	// 윗글 자리에 홀소리가 있는 글쇠를 홀소리를 넣는 상태에서 거듭 눌렀을 때 (ㅐ+ㅐ→ㅒ 등)
		ohiQ[4]=(c2-35)-ohiQ[3];
		ohiInsert(f,0,ohiQ);
		return -1;
	}

	if(!ohiRQ[3] && ohiQ[0] && !ohiQ[3] && (key==0x2F&&c1==74 || key==0x39&&c1==79 || key==0x38&&c1==84)) {
	// 첫소리가 들어가고 홀소리는 들어가지 않은 상태에서 오른쪽 ㅗ 또는 오른쪽 ㅜ가 눌렸을 때
		ohiRQ[3]=key;
	}
	else if(ohiRQ[3] && !ohiQ[6]) {
	// ㅗ·ㅜ가 들어간 겹홀소리를 조합하는 상태이고 받침은 들어가지 않았을 때
		if(ohiQ[3]+ohiQ[4]+35==74 && (c1==66 || c1==67 || c1==86)) {	// 오른쪽 ㅗ와 겹홀소리를 이룰 수 있는 홑홀소리들
		}
		else if(ohiQ[3]+ohiQ[4]+35==79 && (c1==70 || c1==71 || c1==86 )) {	// 오른쪽 ㅜ와 겹홀소리를 이룰 수 있는 홑홀소리들
		}
		else if(ohiQ[3]+ohiQ[4]+35==84 && c1==86) { // 오른쪽 ㅡ와 겹홀소리를 이룰 수 있는 홑홀소리 ㅣ
		}
		else if(no_shift(key) && c1<31 && c2<31) { // 끝소리만 있는 글쇠를 윗글쇠 쓰지 않고 누름
		}
		else if(!no_shift(key) && c1<31) { // 윗글쇠와 함께 눌러 끝소리를 넣음
			c1=c2;
			if(typeof sublayout[key-33] != 'undefined' && sublayout[key-33]) c1=convert_into_ohi_hangeul_phoneme(sublayout[key-33]);
		}
		else if(c1>30 && c2<31) { // 끝소리가 윗글 자리에 있는 홀소리 글쇠
			c1=c2;
		}
	}
	else if((prev_phoneme.length&&unicode_ga.indexOf(prev_phoneme[0])>=0 || ohiQ[0]&&ohiQ[3]&&!ohiQ[6]) && c1>65&&c1<87) {
	// 첫소리와 가운뎃소리가 들어갔고 끝소리가 들어가지 않은 채로 가운뎃소리가 든 글쇠가 눌렸을 때
		if(c2<31) { // 끝소리 넣기
			if(!prev_phoneme.length) {
				c1=c2;
			} else if(prev_combined_phoneme[0]==0x11A1 || unicode_ggeut.indexOf(prev_phoneme[1])<0) {	
				c1=c2;
			}
		}
	}
	else if(!no_shift(key) && (prev_phoneme.length&&unicode_ga.indexOf(prev_phoneme[0])>=0
	 || ohiQ[0]&&ohiQ[3]&&!ohiQ[4]&&!ohiQ[6]) && c1<31) {
	// 첫소리와 가운뎃소리가 들어갔고 끝소리가 들어가지 않은 채로 윗글쇠와 함께 받침이 들어왔을 때
		// 확장 배열의 겹받침으로 넣기
	 	if(option.enable_double_final_ext && sublayout && sublayout[key-33]) c1=convert_into_ohi_hangeul_phoneme(sublayout[key-33]);
	}
	else if((prev_phoneme.length&&unicode_ggeut.indexOf(prev_phoneme[0])>=0 || ohiQ[0]&&ohiQ[3]&&ohiQ[6]&&!ohiQ[7]) && c2<31) {
	// 첫소리·가운뎃소리·끝소리가 모두 들어간 채로 끝소리가 있는 글쇠가 눌렸을 때
		// 같은 자리 글쇠가 거듭 눌렸을 때
		if((c1==ohiQ[6] || c2==ohiQ[6] || c1==convert_into_ohi_hangeul_phoneme(prev_phoneme[0]) || c2==convert_into_ohi_hangeul_phoneme(prev_phoneme[0]))
		 && sublayout && typeof sublayout[key-33] != 'undefined' && sublayout[key-33]
		 && Ko_type!='3-2015')
		{
		// 확장 배열로 처리되는 글쇠 자리일 때 (갈마들이 또는 윗글쇠)
			if(prev_phoneme.length) {
				c2=sublayout[key-33];
				prev_phoneme.unshift(c2);
				prev_combined_phoneme[0]=c2;
				ohiBackspace(f);
				ohiInsert(f,0,c2);
				return -1;
			}
			else {
				c2=convert_into_ohi_hangeul_phoneme(sublayout[key-33]);
				ohiQ[7]=c2-ohiQ[6];
				ohiInsert(f,0,ohiQ);
				return -1;
			}			
		}
		else if(c1>=31 && ohi_hotbadchim.indexOf(ohiQ[6])>=0) {
		// 홑받침이 들어와 있는데 가운뎃소리와 끝소리가 함께 있는 글쇠가 눌렸을 때
			if(prev_phoneme.length>0&&unicode_ggeut.indexOf(prev_phoneme[1])>=0) {
			// 아래아가 들어 있고 겹받침이 조합되었을 때
				prev_phoneme.splice(0);
				prev_phoneme_R.splice(0);
				prev_combined_phoneme.splice(0);
			}
			else {
				// 겹받침 조합 규칙이 있으면 겹받침을 넣고, 그렇지 않으면 홀소리를 넣음
				i=combine_unicode_hangeul_phoneme(convert_into_unicode_hangeul_phoneme(ohiQ[6]),convert_into_unicode_hangeul_phoneme(c2));
				if(i) c1=c2;
			}
		}
	}
	return c1;
}

function hangeul_typewriter(f,key) { // 타자기 자판
	var layout=current_layout.layout;
	var ch;
	var c1=convert_into_ohi_hangeul_phoneme(layout[key-33]);
	var c2=convert_into_ohi_hangeul_phoneme(layout[ukey[dkey.indexOf(key)]-33]);	// 윗글 자리
	ch=layout[key-33];

	if(Ko_type=='4t-1969') {
		if(ohiQ[3]==68-35 && !ohiQ[4] && (!ohiRQ[3]&&c1==86 || ohiRQ[3]==1&&c1==0x3163)) {
		// ㅑ+ㅣ→ㅒ
			ohiQ[4]=1;
			ohiInsert(f,0,ohiQ);
			return -1;
		}
	
		if(ohiQ[3]==72-35 && !ohiQ[4] && !ohiRQ[3]&&c1==86) {
		// ㅕ+ㅣ→ㅖ
			ohiQ[4]=1;
			ohiInsert(f,0,ohiQ);
			return -1;
		}
	}

	if(Ko_type=='4t-1985') {
		if(shift_lock) {
			ch=c2;
			if(ohi_ga.indexOf(c1)<0 || ohi_ga.indexOf(c2)<0) shift_lock=0;				
			// 홀소리만 든 글쇠를 누르면 받침 글쇠가 풀리지 않음. 그밖의 글쇠를 누르면 받침 글쇠가 풀림
		}
	}

	if(ohi_cheos.indexOf(convert_into_ohi_hangeul_phoneme(ch))>=0) {
		ohiRQ = [0,0,0,0,0,0,0,0,0];
	}

	if(compatibility_ga.indexOf(ch)>=0) { // 받침 안 붙는 홀소리
		ch=ohi_ga[compatibility_ga.indexOf(ch)];
		if(Ko_type.substr(-1)=='y') ch=convert_into_unicode_hangeul_phoneme(ch);
		if(!ohiQ[3]) ohiRQ[3]=1;
		else ohiRQ[4]=1;
	}
	return convert_into_ohi_hangeul_phoneme(ch);
}

function is_galmadeuli_input() {
	if(is_old_hangeul_input()) return false;
	var type_name = current_layout.type_name;
	if(type_name.substr(0,5)=='Sin3-') return true;
	if(type_name.substr(-3)=='_gm') return true;
	if(type_name.substr(0,3)=='3-20' && Number(type_name.substr(2,4))>2013) return true;
	if(type_name.substr(0,3)=='3-P') return true;
	var a=[];
	if(a.indexOf(type_name)>=0)	return true;
	return false;
}

function is_moachigi_input() {
	if(current_layout.type_name.substr(0,3)!='3m-') return false;
	if(option.force_normal_typing) return false;
	return true;
}

function is_old_hangeul_input() {
	if(current_layout.type_name.substr(-2)=='-y') return true;
	if(option.enable_old_hangeul_input && typeof current_layout.old_hangeul_layout_type_name != 'undefined')	return true;
	return false;
}

function push_to_key_table(u,d,t) {
	u.push(
		[t[93],t[0],t[31],t[2],t[3],t[4],t[61],t[5],t[9],t[7],t[8],t[62],t[10],''],
		['',t[48],t[54],t[36],t[49],t[51],t[56],t[52],t[40],t[46],t[47],t[90],t[92],t[91]],
		['',t[32],t[50],t[35],t[37],t[38],t[39],t[41],t[42],t[43],t[25],t[1],''],
		['',t[57],t[55],t[34],t[53],t[33],t[45],t[44],t[27],t[29],t[30],'']);
	d.push(
		[t[63],t[16],t[17],t[18],t[19],t[20],t[21],t[22],t[23],t[24],t[15],t[12],t[28],''],
		['',t[80],t[86],t[68],t[81],t[83],t[88],t[84],t[72],t[78],t[79],t[58],t[60],t[59]],
		['',t[64],t[82],t[67],t[69],t[70],t[71],t[73],t[74],t[75],t[26],t[6]],
		['',t[89],t[87],t[66],t[85],t[65],t[77],t[76],t[11],t[13],t[14]]);
}

function push_layout_to_key_table(u,d,b) {
	var c,bas=[];
	for(var i=0;i<94;++i) {
		c=String.fromCharCode(b[i]);
		if(b[i]<0) c=0;
		bas.push(c);
	}
	push_to_key_table(u,d,bas);
}

function push_extended_hangeul_layout_to_key_table(u,d,ext_layout) {
	var i,c,str,charCode;
	var ext=[];
	
	for(i=0;i<94;++i) {
		c = ext_layout[i][ohiHangeul3_HanExtKey%0x10-1][ohiHangeul3_HanExtKey>0x10 ? 1:0]
		if(c<0) c=0;
		ext.push(String.fromCharCode(c));
	}
	push_to_key_table(u,d,ext);
}

function push_extended_sign_layout_to_key_table(u,d,e) {
	var ext=[], c, i, j=(sign_ext_state-1)%10;
	if(j>=0) {
		if(!is_old_hangeul_input() && (Ko_type=='3-2011' || Ko_type=='3-2012')) {
			if(j<3) {
				for(i=0;i<94;++i) {
					c=e[i][j]>0 ? e[i][j] : 0;
					ext.push(String.fromCharCode(c));
				}
			}
		}
		else if(Ko_type.substr(0,2)=='3-') {
			if(sign_ext_state<11) {
				for(i=0;i<94;++i) {
					c=e[i][0][j]>0 ? e[i][0][j] : 0;
					ext.push(String.fromCharCode(c));
				}
			}
			if(sign_ext_state>10) {
				for(i=0;i<94;++i) {
					c=e[i][1][j]>0 ? e[i][1][j] : 0;
					ext.push(String.fromCharCode(c));
				}
			}
		}
		else { // 신세벌식
			for(i=0;i<94;++i) {
				c=e[i][j]>0 ? e[i][j] : 0;
				ext.push(String.fromCharCode(c));
			}
		}
	}
	push_to_key_table(u,d,ext);
}

function insert_sublayout_table(ue, de, uh, dh, sublayout) {
	var u=[], d=[], sub=[], i, j, ds, us;

	for(i=0;i<94;++i) {
		s=String.fromCharCode(convert_into_unicode_hangeul_phoneme(sublayout[i]));
		sub.push(s);
	}

	push_to_key_table(u,d,sub);

	for(i=0;i<de.length;++i) {
		for(j=0;j<de[i].length;++j) {
			if( (!u[i][j] || !u[i][j].charCodeAt(0)) && (!d[i][j] || !d[i][j].charCodeAt(0)) ) continue;
			ds = de[i][j];
			us = ue[i][j];
			if(u[i][j].charCodeAt(0)) {
				if(d[i][j].charCodeAt(0)) {
					if(d[i][j]!=u[i][j]) us=u[i][j];
					ds=d[i][j];
				}
				else ds=u[i][j];
			}
			else if(d[i][j].charCodeAt(0)) ds=d[i][j];

			if(!(us==ue[i][j] || us==uh[i][j] || us==dh[i][j])) ue[i][j] = us;
			if(!(ds==ue[i][j] || ds==uh[i][j] || ds==dh[i][j])) de[i][j] = ds;
		}
	}
}

function show_ohiStatusBar(op) {	// 보람줄(상태 표시줄) 보이기/감추기
	if(op=='off' || op=='0' || !op) {
		ohiStatus.style.display='none';
	}
	else {
		ohiStatus.style.display='block';		
	}
}

function ohiChange_enable_double_final_ext(op) {
	if(op===undefined || op==1) option.enable_double_final_ext=1;
	else option.enable_double_final_ext=0;

	show_keyboard_layout();
}


function show_NCR(op) { // 문자를 유니코드 부호값과 맞대어 나타내기 (Numeric Character Reference)
	if(typeof op != 'undefined') {
		if(op) option.enable_NCR=1;
		else option.enable_NCR=0;
	}

	var f = document.getElementById('inputText');
	var t = document.getElementById('NCR');
	
	if(!f || !t) return;
	
	var opts = document.getElementById('NCR_options');
	
	if(opts) {
		opt = document.getElementById('option_enable_NCR');
		if(!opt) opt = appendChild(opts,'div','option','option_enable_NCR','<div class="option"><input name="enable_NCR" class="checkbox" onclick="show_NCR(this.checked);inputText_focus()" type="checkbox"' + (option.enable_NCR ? ' checked="checked"' : '') + '><label title="&apos;한글&apos;을 &amp;#xD55C;&amp;#xAE00; 꼴로 나타내기">HTML 문자 참조</label></div>');
		if(ohi_menu_num<2) opt.style.display = 'block';
		else opt.style.display = 'none';

		opt = document.getElementById('NCR_option_convert_only_CGG_encoding');
		if(!opt) opt = appendChild(opts,'div','option','NCR_option_convert_only_CGG_encoding','<div class="option"><input name="convert_only_CGG_encoding" class="checkbox" onclick="NCR_option.convert_only_CGG_encoding=this.checked;show_NCR();inputText_focus()" type="checkbox"' + (NCR_option.convert_only_CGG_encoding ? ' checked="checked"' : '') + '><label title="완성형으로 나타낼 수 있는 한글은 바꾸지 않기">첫가끝 조합형만 바꾸기</label></div>');
	}

	if(t && option.enable_NCR) {
		t.style.display='inline-block';
		opt.style.display='block';
	}
	else {
		t.style.display='none';
		opt.style.display='none';
		return;
	}

	var ref_char, char_code, ref_text='';
	for(i=0;i<f.value.length;++i) {
		char_code = f.value.charCodeAt(i);
		ref_char = '&amp;#x'+ char_code.toString(16).toUpperCase() + ';';
		if(NCR_option.convert_only_CGG_encoding) {
		// 첫가끝 조합형 한글만 바꿀 때
			if(unicode_CGG_hangeul_phoneme.indexOf(char_code)<0 && unicode_CGG_hangeul_filler.indexOf(char_code)<0 && unicode_CGG_hangeul_sidedot.indexOf(char_code)<0) {
				ref_char = f.value.charAt(i);
			}
		}
		ref_text += ref_char;
	}
	if(ref_text=='') ref_text='&nbsp;';
	t.innerHTML = ref_text;
}

function show_options() {
	var KE=ohi_KE;
	if(typeof ohi_menu_num == 'undefined') ohi_menu_num=0;
	var opts = document.getElementById('top_options'), opt;

	if(opts) {
		opts.style.display = 'block';
		var type_name = current_layout.type_name;

		opt = document.getElementById('option_turn_off_OHI');
		if(!opt) opt = appendChild(opts,'div','option','option_turn_off_OHI','<div class="option"><input name="turn_off_OHI" class="checkbox" onclick="option.turn_off_OHI=this.checked;ohiStart();inputText_focus()" type="checkbox"' + (option.turn_off_OHI ? ' checked="checked"' : '') + '><label title="온라인 한글 입력기의 입력 기능 끄기">OHI 끔</label></div>');
		if(ohi_menu_num<3) opt.style.display = 'block';
		else opt.style.display = 'none';

		opt = document.getElementById('option_enable_sign_ext');
		if(!opt) opt = appendChild(opts,'div','option','option_enable_sign_ext','<div class="option"><input name="sign_extension" class="checkbox" onclick="ohiChange_enable_sign_ext(this.checked);inputText_focus()" type="checkbox"' + (option.enable_sign_ext ? ' checked="checked"' : '') + '><label title="기호 확장 배열">기호 확장</label></div>');
		if(KE=='Ko' && (typeof current_layout.extended_sign_layout != 'undefined' && current_layout.extended_sign_layout) && Ko_type!='Sin3-2015') opt.style.display = 'block';
		else opt.style.display = 'none';

		opt = document.getElementById('option_enable_old_hangeul_input');
		if(!opt) opt = appendChild(opts,'div','option','option_enable_old_hangeul_input','<div class="option"><input name="enable_old_hangeul_input" class="checkbox" onclick="option.enable_old_hangeul_input=this.checked;ohiChange_enable_old_hangeul_input();ohiStart();inputText_focus()" type="checkbox"' + (option.enable_old_hangeul_input ? ' checked="checked"' : '') + '><label title="옛한글 넣기">옛한글</label></div>');
		if(typeof current_layout.old_hangeul_layout_type_name != 'undefined'&& !option.phonemic_writing) opt.style.display = 'block';
		else opt.style.display = 'none';

		opt = document.getElementById('option_enable_Sin3_diphthong_key');
		if(!opt) opt = appendChild(opts,'div','option','option_enable_Sin3_diphthong_key','<div class="option"><input name="enable_Sin3_diphthong_key" class="checkbox" onclick="option.enable_Sin3_diphthong_key=this.checked;show_keyboard_layout();inputText_focus()" type="checkbox"' + (option.enable_Sin3_diphthong_key ? ' checked="checked"' : '') + '><label title="오른손 쪽에서 ㅗ,ㅜ,ㅡ,ㆍ 넣기">오른쪽 홀소리</label></div>');
		if(type_name.substr(0,5)=='Sin3-' && is_old_hangeul_input()) opt.style.display = 'block';
		else opt.style.display = 'none';
	
		opt = document.getElementById('option_enable_Sin3_adding_cheos_with_shift_key');
		if(!opt) opt = appendChild(opts,'div','option','option_enable_Sin3_adding_cheos_with_shift_key','<div class="option"><input name="enable_Sin3_adding_cheos_with_shift_key" class="checkbox" onclick="option.enable_Sin3_adding_cheos_with_shift_key=this.checked;inputText_focus()" type="checkbox"' + (option.enable_Sin3_adding_cheos_with_shift_key ? ' checked="checked"' : '') + '><label title="오른쪽 홀소리 자리에서 윗글쇠 눌러 첫소리 넣기">윗글 첫소리</label></div>');
		if(type_name.substr(0,5)=='Sin3-' && is_old_hangeul_input()) opt.style.display = 'block';
		else opt.style.display = 'none';
			
		opt = document.getElementById('option_only_CGG_encoding');
		if(!opt) opt = appendChild(opts,'div','option','option_only_CGG_encoding','<div class="option"><input name="only_CGG_encoding" class="checkbox" onclick="option.only_CGG_encoding=this.checked;inputText_focus()" type="checkbox"' + (option.only_CGG_encoding ? ' checked="checked"' : '') + '><label title="모든 한글을 첫가끝 방식으로만 넣기">첫가끝으로만</label></div>');
		if(is_old_hangeul_input()) opt.style.display = 'block';
		else opt.style.display = 'none';

		opt = document.getElementById('option_abbreviation');
		if(!opt) opt = appendChild(opts,'div','option','option_abbreviation','<div class="option"><input name="abbreviation" class="checkbox" onclick="option.abbreviation=this.checked;inputText_focus()" type="checkbox"' + (option.abbreviation ? ' checked="checked"' : '') + '><label title="이어치기 방식으로 쓰는 줄여넣기">줄임말 조합</label></div>');
		if(Ko_type.substr(0,3)!='3m-' && typeof current_layout.ieochigi_hangeul_abbreviation_table != 'undefined' && !is_old_hangeul_input())
			opt.style.display = 'block';
		else opt.style.display = 'none';

		opt = document.getElementById('option_force_normal_typing');
		if(!opt) opt = appendChild(opts,'div','option','option_force_normal_typing','<div class="option"><input name="force_normal_typing" class="checkbox" onclick="option.force_normal_typing=this.checked;inputText_focus()" type="checkbox"' + (option.force_normal_typing ? ' checked="checked"' : '') + '><label title="한 글쇠씩 이어서 넣는 방식으로 모아치기 자판 쓰기">이어치기</label></div>');
		if(KE=='Ko' && Ko_type.substr(0,3)=='3m-') opt.style.display = 'block';
		else opt.style.display = 'none';

		opt = document.getElementById('option_convenience_combination');
		if(!opt) opt = appendChild(opts,'div','option','option_convenience_combination','<div class="option"><input name="convenience_combination" class="checkbox" onclick="option.convenience_combination=this.checked;inputText_focus()" type="checkbox"' + (option.convenience_combination ? ' checked="checked"' : '') + '><label title="입력 편의를 높이기 위한 한글 낱자 조합">편의 낱자 조합</label></div>');
		if(!is_old_hangeul_input() && typeof current_layout.hangeul_convenience_combination_table!='undefined') opt.style.display = 'block';
		else opt.style.display = 'none';

		opt = document.getElementById('option_enable_double_final_ext');
		if(!opt) opt = appendChild(opts,'div','option','option_enable_double_final_ext','<div class="option"><input name="enable_double_final_ext" class="checkbox" onclick="ohiChange_enable_double_final_ext(this.checked);inputText_focus()" type="checkbox"' + (option.enable_double_final_ext ? ' checked="checked"' : '') + '><label title="윗글쇠를 함께 누르거나 같은 글쇠를 거듭 눌러 겹받침 넣기">겹받침 확장</label></div>');
		if(Ko_type.substr(0,3)!='3m-' && typeof current_layout.sublayout != 'undefined' && !is_old_hangeul_input() && current_layout.sublayout.indexOf(0x11AD)>=0) opt.style.display = 'block';
		else opt.style.display = 'none';

		opt = document.getElementById('option_phonemic_writing');
		if(!opt) opt = appendChild(opts,'div','option','option_phonemic_writing','<div class="option"><input name="phonemic_writing" class="checkbox" onclick="option.phonemic_writing=this.checked;ohiChange_enable_phonemic_writing();inputText_focus()" type="checkbox"' + (option.phonemic_writing ? ' checked="checked"' : '') + '><label title="한글을 낱자 단위로 풀어서 넣기">풀어쓰기</label></div>');
		if(!is_old_hangeul_input()) opt.style.display = 'block';
		else opt.style.display = 'none';
			
		opt = document.getElementById('option_phonemic_writing_in_single_phoneme');
		if(!opt) opt = appendChild(opts,'div','option','option_phonemic_writing_in_single_phoneme','<div class="option"><input name="phonemic_writing_in_single_phoneme" class="checkbox" onclick="option.phonemic_writing_in_single_phoneme=this.checked;inputText_focus()" type="checkbox"' + (option.phonemic_writing_in_single_phoneme ? ' checked="checked"' : '') + '><label title="모두 홑낱자로 풀기">겹낱자 풀기</label></div>');
		if(option.phonemic_writing && !is_old_hangeul_input()) opt.style.display = 'block';
		else opt.style.display = 'none';
	
		opt = document.getElementById('option_phonemic_writing_in_halfwidth_letter');
		if(!opt) opt = appendChild(opts,'div','option','option_phonemic_writing_in_halfwidth_letter','<div class="option"><input name="phonemic_writing_in_halfwidth_letter" class="checkbox" onclick="option.phonemic_writing_in_halfwidth_letter=this.checked;inputText_focus()" type="checkbox"' + (option.phonemic_writing_in_halfwidth_letter ? ' checked="checked"' : '') + '><label title="모두 홑낱자로 풀기">반각 낱자</label></div>');
		if(option.phonemic_writing && !is_old_hangeul_input()) opt.style.display = 'block';
		else opt.style.display = 'none';

		opt = document.getElementById('option_sunalae');
		if(!opt) opt = appendChild(opts,'div','option','option_sunalae','<div class="option"><input name="sunalae" class="checkbox" onclick="option.sunalae=this.checked;inputText_focus()" type="checkbox"' + (option.sunalae ? ' checked="checked"' : '') + '><label title="홀소리 글쇠를 거듭 눌러 겹닿소리(된소리) 넣기">순아래 조합 <a href="https://sites.google.com/site/tinyduckn/dubeolsig-sun-alae" target="_blank">ⓘ</a></label></div>');
		if(!is_old_hangeul_input() && type_name.substr(0,2)=='2-' && type_name.substr(0,5)!='2-sun') opt.style.display = 'block';
		else opt.style.display = 'none';
	}

	var opts = document.getElementById('bottom_options'), opt;

	if(opts) {
		opts.style.display = 'block';

		opt = document.getElementById('option_square_layout');
		if(!opt) opt = appendChild(opts,'div','option','option_square_layout','<div class="option"><input name="square_layout" class="checkbox" onclick="option.square_layout=this.checked;show_keyboard_layout();inputText_focus()" type="checkbox"' + (option.square_layout ? ' checked="checked"' : '') + '><label>가지런한 배열표</label></div>');
		if(ohi_menu_num<3 && option.show_layout) opt.style.display = 'block';
		else opt.style.display = 'none';
	}
	
}

function show_keyboard_layout(type) {
	var rows = document.getElementById('keyboardLayout');
	if(!rows) return false;
	rows.style.position = 'relative';
	rows.style.display = 'block';

	var opts, opt;
	var inner_html='';
	shift_click=0;
	var KE = ohi_KE;
	if(typeof ohi_menu_num=='undefined') ohi_menu_num=0;
	show_options();

	if(typeof type=='undefined') type = current_layout.type_name;
	else if(type==1) {
		option.show_layout = 1;
		type = current_layout.type_name;
	}
	else if(!type) {
		option.show_layout = 0;
		rows.innerHTML = '<div class="show_layout"><span class="menu" onclick="option.show_layout=1;show_keyboard_layout(1);inputText_focus()">배열표 보이기</span></div>';
		opt = document.getElementById('option_square_layout');
		opt.style.display = 'none';
		return false;
	}

	if(!option.show_layout) return;

	if(ohi_menu_num>2) {
		rows.style.display = 'none';
		opts = document.getElementById('top_options');
		opts.style.display = 'none';
		opts = document.getElementById('bottom_options');
		opts.style.display = 'none';
	}

	var ue_qwerty=[
		['~','!','@','#','$','%','^','&amp;','*','(',')','_','+','Back'],
		['Tab','Q','W','E','R','T','Y','U','I','O','P','{','}','|'],
		['Shift','A','S','D','F','G','H','J','K','L',':','"','Enter'],
		['Shift','Z','X','C','V','B','N','M','&lt;','&gt;','?','Shift']
	];
	var de_qwerty=[
		['`','1','2','3','4','5','6','7','8','9','0','-','=','Space'],
		['','　','　','　','　','　','　','　','　','　','　','[',']','\\'],
		['Lock','　','　','　','　','　','　','　','　','　',';','\''],
		['　','　','　','　','　','　','　','　',',','.','/','　']
	];

	var ue_dvorak=[
		['~','!','@','#','$','%','^','&amp;','*','(',')','{','}','Back'],
		['Tab','"','&lt;','&gt;','P','Y','F','G','C','R','L','?','+','|'],
		['Shift','A','O','E','U','I','D','H','T','N','S','_','Enter'],
		['Shift',': ','Q','J','K','X','B','M','W','V','Z','Shift']];
	var de_dvorak=[
		['` ','1','2','3','4','5','6','7','8','9','0','[',']','Space'],
		['','\' ',', ','. ','　','　','　','　','　','　','　','/','=','\\'],
		['Lock','　','　','　','　','　','　','　','　','　','　','-'],
		['','; ','　','　','　','　','　','　','　','　','　']];

	var ue_colemak=[
		ue_qwerty[0],
		['Tab','Q','W','F','P','G','J','L','U','Y',':','{','}','|'],
		['Shift','A','R','S','T','D','H','N','E','I','O','"','Enter'],
		['Shift','Z','X','C','V','B','K','M','&lt;','&gt;','?','Shift']
	];
	var de_colemak=[
		de_qwerty[0],
		['','　','　','　','　','　','　','　','　','　','; ','[ ',']','\\'],
		['Lock','　','　','　','　','　','　','　','　','　','　','\''],
		de_qwerty[3]
	];

	var u2_KSX5002=[
		[],
		['','ㅃ','ㅉ','ㄸ','ㄲ','ㅆ','　','　','　','ㅒ','ㅖ']
	];
	var d2_KSX5002=[
		[],
		['','ㅂ','ㅈ','ㄷ','ㄱ','ㅅ','ㅛ','ㅕ','ㅑ','ㅐ','ㅔ'],
		['','ㅁ','ㄴ','ㅇ','ㄹ','ㅎ','ㅗ','ㅓ','ㅏ','ㅣ'],
		['','ㅋ','ㅌ','ㅊ','ㅍ','ㅠ','ㅜ','ㅡ']
	];

	var u2_KPS9256=[
		[],
		['','ㅃ','','ㄸ','','','','','','ㅒ','ㅖ'],
		['','ㅉ','ㄲ','','','ㅆ','','','','']
	];
	var d2_KPS9256=[
		[],
		['','ㅂ','ㅁ','ㄷ','ㄹ','ㅎ','ㅕ','ㅜ','ㅓ','ㅐ','ㅔ'],
		['','ㅈ','ㄱ','ㅇ','ㄴ','ㅅ','ㅗ','ㅏ','ㅣ','ㅡ'],
		['','ㅋ','ㅌ','ㅊ','ㅍ','ㅠ','ㅛ','ㅑ']
	];

	var layout=[], uh=[], dh=[];

	if(KE=='Ko' && Ko_type.substr(0,2)=='2-' && typeof current_layout.layout=='undefined') {
		uh = type.indexOf('KSX5002')>=0 ? u2_KSX5002 : type=='2-KPS9256' ? u2_KPS9256 : uh;
		dh = type.indexOf('KSX5002')>=0 ? d2_KSX5002 : type=='2-KPS9256' ? d2_KPS9256 : dh;
	}
	else if(KE=='Ko') {
		if(sign_ext_state>0) { // 기호 확장 배열
			if(typeof current_layout.extended_sign_layout != 'undefined') layout = current_layout.extended_sign_layout;
			if(!layout) return;

			if(is_old_hangeul_input() && typeof current_layout.old_hangeul_layout_type_name != 'undefined') {
				if(typeof find_layout_info('Ko', current_layout.old_hangeul_layout_type_name).extended_sign_layout != 'undefined')
					layout = find_layout_info('Ko', current_layout.old_hangeul_layout_type_name).extended_sign_layout;
			}

			if(layout.length) {
				push_extended_sign_layout_to_key_table(uh, dh, layout);
			}
		}
		else if(ohiHangeul3_HanExtKey) { // 한글 확장 배열
			layout = K3_2012y_extended_hangeul_layout;
			push_extended_hangeul_layout_to_key_table(uh, dh, layout);
		}
		else if(typeof current_layout != 'undefined' && typeof current_layout.layout != 'undefined') { // 옛한글 배열
			layout=current_layout.layout;
			if(option.enable_old_hangeul_input) {
				if(typeof current_layout.old_hangeul_layout_type_name != 'undefined') {
					layout = find_layout_info(KE, current_layout.old_hangeul_layout_type_name).layout;
				}
			}
			push_layout_to_key_table(uh, dh, layout);
		}
	}

	var ue = En_type=='QWERTY' ? ue_qwerty : En_type=='Dvorak' ? ue_dvorak : En_type=='Colemak' ? ue_colemak : 0;
	var de = En_type=='QWERTY' ? de_qwerty : En_type=='Dvorak' ? de_dvorak : En_type=='Colemak' ? de_colemak : 0;

	if(typeof current_layout.sublayout != 'undefined' && !is_old_hangeul_input()
	 && (option.enable_double_final_ext || current_layout.type_name.substr(0,3)=='3m-')
	 && sign_ext_state<=0) {
		insert_sublayout_table(ue, de, uh, dh, current_layout.sublayout);
	}

	ue.push(['기준','영문','한글','Space','한/영','2벌식','3벌식']);
	de.push(['자판','바꿈','바꿈','','','바꿈','바꿈']);

	inner_html += '<div id="keyboardLayoutInfo"></div><span class="menu" onclick="show_keyboard_layout(0);inputText_focus()" onmouseover="this.className=\'menu over\'" onmouseout="this.className=\'menu\'">배열표 숨기기</span>';
	inner_html += '<div id="keyboardLayoutTable">';
	inner_html += '<div id="row0" class="row"></div>';
	inner_html += '<div id="row1" class="row"></div>';
	inner_html += '<div id="row2" class="row"></div>';
	inner_html += '<div id="row3" class="row"></div>';
	inner_html += '<div id="row4" class="row"></div>';
	inner_html += '</div>';

	rows.innerHTML = inner_html;

	for(i=0, k=-1; ue[i]; i++) {
		var row = document.getElementById('row'+i);
		for(j=0; ue[i][j]; j++) {
			var tdclass = 'e1';
			var tdid = 'key'+(++k);
			var charCode;
			if(dh[i] && dh[i][j]) {
				charCode = dh[i][j].charCodeAt(0);
				if(charCode>128) dh[i][j] = String.fromCharCode(convert_into_compatibility_hangeul_letter(charCode));
				if(charCode>0x3130) tdclass = (type.substr(0,1)=='2' || type.substr(-7)=='2-KSX5002' || type=='2-KPS9256' || j>5 && !(i<2&&j>10 || i==3&&j==10&&type.substr(0,5)!='Sin3-')) ? 'h1':'h3';
				if(charCode>0x314E) tdclass = 'h2';
				if(i==3 && j==10 && type=='3-sun1990') tdclass = 'h3';

				if(unicode_modern_cheos.indexOf(charCode)>=0) {
					tdclass = 'h1';
				}
				else if(Ko_type.substr(1,2)=='t-' && charCode>=0x314F && charCode<0x3164) {
					tdclass = 'h2 gin-hol';
				}
				else if(unicode_modern_ga.indexOf(charCode)>=0) {
					tdclass = 'h2';
				}
				else if(unicode_modern_ggeut.indexOf(charCode)>=0) {
					tdclass = 'h3';
				}
				else if(compatibility_hangeul_phoneme.indexOf(dh[i][j].charCodeAt(0))<0 && unicode_CGG_hangeul_phoneme.indexOf(charCode)>=0)
					dh[i][j] = (unicode_ga.indexOf(charCode)>=0 ? String.fromCharCode(0x115F) : '') + (unicode_ggeut.indexOf(charCode)>=0 ? String.fromCharCode(0x115F)+String.fromCharCode(0x1160) : '') + dh[i][j];

				if(tdclass.substr(0,1)!='h') {
					if(unicode_modern_ggeut.indexOf(uh[i][j].charCodeAt(0))>=0) {
						tdclass = 'h3';
					}
				}
			}

			charCode = ue[i][j].charCodeAt(0);
			if(KE=='En' && ue[i][j].length==1) {
				if(charCode>64 && charCode<91 || charCode>96 && charCode<123) tdclass = 'e2';
			}
			if(unicode_CGG_hangeul_phoneme.indexOf(charCode)>=0) {
				charCode = ue[i][j].charCodeAt(0);
				ue[i][j] = String.fromCharCode(convert_into_compatibility_hangeul_letter(charCode));
			}
			var col = appendChild(row,'div',tdclass,tdid,'','36px','0 0 0 0');

			col.onclick = function(e){
				e=e||window.event;
				tableKey_clicked(e, this.id.substr(3), dkey[this.id.substr(3)],ukey[this.id.substr(3)]);
			};
			col.tabindex = 0;
			if(!option.square_layout) {
				if(k==13) col.style.width = '62px'; // backspace
				if(k==14) col.style.width = '56px'; // tab
				if(k==27) col.style.width = '42px'; // \ 글쇠
				if(k==28) col.style.width = '67px'; // shift lock
				if(k==40) col.style.width = '71px'; // Enter
				if(k==41) col.style.width = '87px'; // 왼쪽 shift
				if(k==52) col.style.width = '91px'; // 오른쪽 shift
				
			}
			else { // 가지런한 배열표
				if(k==0) col.style.width = '69px'; // ` 글쇠
				if(k==13) { // backspace
					col.style.letterSpacing = '-2px';
					col.style.width = '33px';
				}
				if(k==12 || k==26) col.style.width = '32px'; // =, ] 글쇠
				if(k==14) col.style.width = '69px'; // tab
				if(k==27) col.style.width = '33px'; // \ 글쇠
				if(k==28) col.style.width = '69px'; // shift lock
				if(k==40) col.style.width = '69px'; // Enter
				if(k==41) col.style.width = '69px'; // 왼쪽 shift
				if(k==52) col.style.width = '109px'; // 오른쪽 shift
			}
			
			if(ue[i][j]=='Back' || ue[i][j]=='Tab' || ue[i][j]=='Enter' || ue[i][j]=='Shift') col.style.textAlign = 'center';
			
			if(i==4) {
				if(ue[i][j]=='Space') col.style.width = '312px';
				else col.style.width = '41px', col.className = 'e3 special';
			}
			
			var up = appendChild(col,'div','up','up'+k);
			appendChild(up,'div','ue','ue'+k,ue[i][j]);
			if(uh[i]) {
				if(uh[i][j]) {
					charCode = uh[i][j].charCodeAt(0);
					if(unicode_CGG_hangeul_phoneme.indexOf(charCode)>=0) charCode=convert_into_compatibility_hangeul_letter(charCode);
					uh[i][j] = String.fromCharCode(charCode);
					if(compatibility_hangeul_phoneme.indexOf(uh[i][j].charCodeAt(0))<0) uh[i][j] = (unicode_ga.indexOf(charCode)>=0 ? String.fromCharCode(0x115F) : '') + (unicode_ggeut.indexOf(charCode)>=0 ? String.fromCharCode(0x115F)+String.fromCharCode(0x1160) : '') + uh[i][j];
					if(uh[i][j]==dh[i][j] && uh[i][j]!=de[i][j]) uh[i][j]=' ';  // 한글 배열에서 윗글과 아랫글 자리의 문자가 같을 때 윗글 자리를 나타내지 않음
					if( (Ko_type.substr(0,2)=='3-' && is_galmadeuli_input() || typeof current_layout.sublayout != 'undefined') && unicode_modern_ggeut.indexOf(charCode)>=0 && unicode_modern_hotbatchim.indexOf(charCode)<0) {
						// 갈마들이 공세벌식 자판의 기본 배열에 들어가는 겹받침을 회색으로 나타냄
						uh[i][j] = '<span style="color:gray;">'+uh[i][j]+'</span>';
					}
				}
				if(uh[i][j]==ue[i][j] || uh[i][j]=='&'&&ue[i][j]=='&amp;' || uh[i][j]=='<'&&ue[i][j]=='&lt;' || uh[i][j]=='>'&&ue[i][j]=='&gt;') uh[i][j]=' ';
				appendChild(up,'div','uh','uh'+k,uh[i][j]);
			}
			if(de[i][j]) {
				var down = appendChild(col,'div','down','down'+k);
				charCode = de[i][j].charCodeAt(0);
				if(unicode_CGG_hangeul_phoneme.indexOf(charCode)>=0) de[i][j] = String.fromCharCode(convert_into_compatibility_hangeul_letter(charCode));
				appendChild(down,'div','de','de'+k,de[i][j]);
				if(dh[i] && (!dh[i][j] || dh[i][j]==de[i][j])) dh[i][j]=' ';
				if(dh[i] && dh[i][j]) appendChild(down,'div','dh','dh'+k,dh[i][j]);
			}
		}
	}

	var sign_ext_tag = '<span style="margin-left:-1px;background:black;color:#fff;letter-spacing:-1px;font-size:8px;">기호</div>';
	var sign_ext_tag1 = '<span style="margin:0;padding:0;background:black;color:#fff;letter-spacing:-2px;font-size:0.7em;">기호①</span>';
	var sign_ext_tag2 = '<span style="margin:0;padding:0;background:black;color:#fff;letter-spacing:-2px;font-size:0.7em">기호②</span>';
	var han_ext_tag1 = '<span style="margin:0;padding:0;background:black;color:#fff;letter-spacing:-2px;font-size:0.7em;">한글①</span>';
	var han_ext_tag2 = '<span style="margin:0;padding:0;background:black;color:#fff;letter-spacing:-2px;font-size:0.7em;">한글②</span>';
	var Moachigi_modifier_tag = '<span style="background:black;color:#fff;font-size:1em;">⇦</span>';

	if(option.enable_sign_ext && KE=='Ko' && Ko_type.substr(0,2)=='3-' && typeof current_layout.extended_sign_layout != 'undefined') { // 공세벌식 자판의 기호 확장 글쇠 나타내기
		if(Ko_type=='3-87') {
			document.getElementById('ue9').innerHTML = '<span style="margin:0;padding:0;background:black;color:#fff;font-size:0.7em;">기호②</span>';
			document.getElementById('ue51').innerHTML = '<span style="margin:0;padding:0;background:black;color:#fff;font-size:0.7em">기호①</span>';
		}
		else if(Ko_type=='3-95') {
			document.getElementById('de51').innerHTML = sign_ext_tag;
		}
		else if(!is_old_hangeul_input() && (Ko_type=='3-2011' || Ko_type=='3-2012')) {
			document.getElementById('de8').innerHTML = sign_ext_tag;
			document.getElementById('de45').innerHTML = sign_ext_tag;
		}
		else {
			document.getElementById('uh9').innerHTML = sign_ext_tag2;
			document.getElementById('uh51').innerHTML = sign_ext_tag1;
		}
	}

	if(KE=='Ko' && is_old_hangeul_input() && (Ko_type.substr(0,6)=='3-2011' || Ko_type.substr(0,6)=='3-2012' || Ko_type.substr(0,6)=='3-2014' || Ko_type.substr(0,7)=='3-2015P')) {
			document.getElementById('dh7').innerHTML = han_ext_tag1;
			document.getElementById('dh8').innerHTML = han_ext_tag2;
			document.getElementById('uh7').innerHTML = '<span style="color:#666;font-size:0.8em">(ㅣ)</span>';
			document.getElementById('uh8').innerHTML = '<span style="color:#666;font-size:0.8em">(ㅡ)</span>';
	}

	if(KE=='Ko' && Ko_type.substr(0,4)=='Sin3') {
		if( !sign_ext_state && typeof current_layout.sublayout != 'undefined' && !(!option.enable_Sin3_diphthong_key && is_old_hangeul_input()) ) {
			// 빗금(/) 자리의 겹낱자 확장 배열 홀소리
			if(current_layout.sublayout[14]) {
				document.getElementById('uh51').innerHTML = '<font size="1">('+String.fromCharCode(convert_into_compatibility_hangeul_letter(current_layout.sublayout[14]))+')</font>';
			}
			else if( (En_type!='Dvorak' && current_layout.layout[30]==0x3F) || (En_type=='Dvorak' && current_layout.layout[30]==0x5A) ) {
				document.getElementById('uh51').innerHTML = '<font size="1">(ㅗ)</font>';
			}

			if(current_layout.sublayout[72]) { // 신세벌식 P2의 오른쪽 ㅡ 자리 (i 자리)
					document.getElementById('de22').innerHTML = '<span style="font-size:10px; letter-spacing:-2px;color:#333;">('+String.fromCharCode(convert_into_compatibility_hangeul_letter(current_layout.sublayout[72]))+')</span>';
			}

			if(current_layout.sublayout[78]) { // 신세벌식 P2의 오른쪽 ㅜ 자리 (o 자리)
				document.getElementById('de23').innerHTML = '<span style="font-size:10px; letter-spacing:-2px;color:#333;">('+String.fromCharCode(convert_into_compatibility_hangeul_letter(current_layout.sublayout[78]))+')</span>';
			}

			if(current_layout.sublayout[79]) {
				if(current_layout.sublayout[79]==0x119E) {
					// P 자리의 겹낱자 확장 배열 (신세벌식 P2의 오른쪽 아래아)
					document.getElementById('de24').innerHTML = '<span style="font-size:10px; letter-spacing:-3px;color:#333;">('+String.fromCharCode(convert_into_compatibility_hangeul_letter(current_layout.sublayout[79]))+')</span>';
				}
				else {
					document.getElementById('de24').innerHTML = '<font size="1">'+String.fromCharCode(convert_into_compatibility_hangeul_letter(current_layout.sublayout[79]))+'</font>';
				}
			}			
		}
		
		if(option.enable_sign_ext && typeof current_layout.extended_sign_layout != 'undefined' && current_layout.extended_sign_layout) {
			document.getElementById('de35').innerHTML = sign_ext_tag;
			for(i=0;i<3;++i)
				document.getElementById('de'+(36+i)).innerHTML = '<span style="padding:0 1px;background:black;color:#fff;font-size:10px;">'+String.fromCharCode(0x2460+i)+'</span>';
		}

		if(is_old_hangeul_input() && !sign_ext_state) { // 신세벌식 P, P2 옛한글 받침 배열
			document.getElementById('de32').innerHTML = '<span style="margin-left:-1px;background:black;color:#fff;letter-spacing:-1px;font-size:8px;">받침</span>';
			document.getElementById('de15').innerHTML = '<span style="color:#666">ㅿ</span>';
			document.getElementById('de29').innerHTML = '<span style="color:#666">ㆁ</span>';
			document.getElementById('de31').innerHTML = '<span style="color:#666">ㆆ</span>';
			document.getElementById('de31').innerHTML = '<span style="color:#666">ㆆ</span>';
		}
	}

	if(KE=='Ko' && En_type!='Dvorak' && !sign_ext_state && !ohiHangeul3_HanExtKey) {
		if((Ko_type.substr(0,5)=='Sin3-' && typeof current_layout.sublayout != 'undefined' && current_layout.sublayout[58]==0x119E)
	 	 || Ko_type.substr(0,3) == '3-P' || Ko_type.substr(0,7)=='3-2015P' || Ko_type.substr(0,6)=='3-2014' || Ko_type.substr(0,6)=='3-2012' || Ko_type=='3-90') {
			document.getElementById('dh25').innerHTML = '<font size="1">(ㆍ)</font>';
		}
	}

	if(KE=='Ko' && Ko_type=='3m-Semoe2014') {
		document.getElementById('uh38').innerHTML += Moachigi_modifier_tag;
	}
	
	if(KE=='Ko' && Ko_type=='3m-Semoe2015') {
		document.getElementById('uh24').innerHTML = Moachigi_modifier_tag;
		document.getElementById('uh38').innerHTML = Moachigi_modifier_tag;
		document.getElementById('ue45').removeAttribute('class');
		document.getElementById('ue45').style.float = 'left';
		document.getElementById('ue45').innerHTML = Moachigi_modifier_tag;
	}

	if(KE=='Ko' && Ko_type=='3m-Semoe2016') {
		if(sign_ext_state<=0) {
			document.getElementById('uh25').innerHTML = Moachigi_modifier_tag;
			document.getElementById('uh38').innerHTML = Moachigi_modifier_tag;
			document.getElementById('ue45').removeAttribute('class');
			document.getElementById('ue45').style.float = 'left';
			document.getElementById('ue45').innerHTML = Moachigi_modifier_tag;
			}

		if(option.enable_sign_ext) {
			document.getElementById('uh35').innerHTML = sign_ext_tag;
			if(sign_ext_state<0) {
				for(i=0;i<3;++i)
					document.getElementById('uh'+(36+i)).innerHTML = '<span style="padding:0 1px;background:black;color:#fff;font-size:10px;">'+String.fromCharCode(0x2460+i)+'</span>';
			}
		}
	}
	
	if(KE=='Ko' && Ko_type=='3m-Semoe') {
		if(sign_ext_state<=0) {
			document.getElementById('uh38').innerHTML = Moachigi_modifier_tag;
			document.getElementById('ue45').removeAttribute('class');
			document.getElementById('ue45').style.float = 'left';
			document.getElementById('ue45').innerHTML = Moachigi_modifier_tag;
			document.getElementById('uh50').innerHTML = Moachigi_modifier_tag;
		}

		if(option.enable_sign_ext) {
			document.getElementById('de35').innerHTML = sign_ext_tag;
			for(i=0;i<3;++i)
				document.getElementById('de'+(36+i)).innerHTML = '<span style="padding:0 1px;background:black;color:#fff;font-size:10px;">'+String.fromCharCode(0x2460+i)+'</span>';
		}
	}	

	if(KE=='Ko' && (Ko_type=='3t-Oesol' || Ko_type=='4t-1985')) {
		document.getElementById('ue41').innerHTML = 'Shift';
		document.getElementById('de41').innerHTML = '(받침)';
		document.getElementById('ue52').innerHTML = 'Shift';
		document.getElementById('de52').innerHTML = '(받침)';
		if(Ko_type=='4t-1985') {
			// 홀소리와 받침이 함께 든 글쇠를 받침이 든 글쇠와 같은 색으로 나타냄
			document.getElementById('key25').className = 'h3';
			document.getElementById('key38').className = 'h3';
			document.getElementById('key39').className = 'h3';
		}
	}

	if(shiftlock_click) {
		var shiftlock = document.getElementById('key28');
		shiftlock.style.backgroundColor = 'orange';
	}

	show_keyboard_layout_info();
}

function ohiStart() {
	var i;
	var textarea=document.getElementById('inputText');
	var inputs=document.getElementsByTagName("INPUT");

	if(option.turn_off_OHI) {
		show_ohiStatusBar(0);	// 보람줄(상태 표시줄) 감추기
		if(textarea) textarea.style.imeMode = 'active';
		if(inputs) {
			for(i=0;i<inputs.length;++i) {
				if(inputs[i].className=='text') inputs[i].style.imeMode = 'active';
			}
		}
		return;
	}

	if(typeof current_layout.KE=='undefined' || !current_layout.KE) {
		ohiChange(default_ohi_KE, default_ohi_KE=='En' ? default_En_type : default_Ko_type);
	}
	
	ohi_KE = current_layout.KE;

	ohiStatus.innerHTML = '<a href="javascript:ohiChange_KE();" style="color:White;text-decoration:none;">&nbsp;' + ohi_KE.toUpperCase() + ' </a>'
	 + ' | <a href="javascript:ohiChange_between_same_type(\'Ko\');"><span style="color:yellow">Ko:</span><span style="color:Aquamarine">' + (is_old_hangeul_input() && typeof current_layout.old_hangeul_layout_type_name != 'undefined' ? current_layout.old_hangeul_layout_type_name : Ko_type) + '</span></a>'
	 + ' / <a href="javascript:ohiChange_between_same_type(\'En\');"><span style="color:LightPink">En:</span><span style="color:Aquamarine">' + En_type + '</span></a>'
	 + ' | <a href="javascript:ohiChange_KBD_type();" style="color:WhiteSmoke;text-decoration:none;">' + ohi_KBD_type + '&nbsp;</a>';

	if(document.body) {
		show_ohiStatusBar(1);

		var onclick = function() {
			if(prev_phoneme.length) {
				prev_phoneme.splice(0);
				prev_phoneme_R.splice(0);
				prev_combined_phoneme.splice(0);
			}
			backspaces_for_restoring_prev_state=0;
		};

		if(textarea) {
			textarea.style.imeMode = 'disabled';
			textarea.onclick = onclick;
		}

		if(inputs) {
			for(i=0;i<inputs.length;++i) {
				if(inputs[i].className=='text') {
					inputs[i].style.imeMode = 'disabled';
					inputs[i].onclick = onclick;
				}
			}
		}

		if(document.all) {
			ohiStatus.style.position = 'fixed';
			ohiStatus.style.right = -(document.body.scrollLeft||document.documentElement.scrollLeft)+'px';
			ohiStatus.style.bottom = -(document.body.scrollTop||document.documentElement.scrollTop)+'px';
		}

		if(document.body != ohiStatus.parentNode) {
			if(!ohiStatus.style.position) {
				ohiStatus.style.position = 'fixed';
				ohiStatus.style.right = '0px';
				ohiStatus.style.bottom = '0px';
			}
			ohiStatus.target = '_blank';
			//ohiStatus.href = 'http://ohi.pat.im';
			ohiStatus.style.fontFamily = 'GulimChe,monospace';
			ohiStatus.style.fontWeight = 'normal';
			ohiStatus.style.color = 'white';
			ohiStatus.style.backgroundColor = 'royalblue';
			ohiStatus.style.fontSize = '13px';
			ohiStatus.style.lineHeight = '13px';
			ohiStatus.style.zIndex = '2550000';

			document.body.appendChild(ohiStatus);
			if(document.addEventListener) {
				document.addEventListener('keypress', ohiKeypress, true);
				document.addEventListener('keydown', ohiKeydown, true);
				document.addEventListener('keyup', ohiKeyup, true);
			} else {
				document.onkeydown = ohiKeydown;
				document.onkeypress = ohiKeypress;
				document.onkeyup = ohiKeyup;
			}
			for(var i=0; i<window.frames.length; i++) {
				var ohi = document.createElement('script');
				ohi.type= 'text/javascript';
				ohi.src = '//ohi.pat.im/ohi.js';
				if(typeof(window.frames[i].document)!='unknown') window.frames[i].document.body.appendChild(ohi);
			}

			show_NCR();
		}
	}
	else ohiTimeout = setTimeout("ohiStart()",100);
}

function show_keyboard_layout_info() {
	var KE=ohi_KE;
	var kbd = ohi_KBD_type=='QWERTY' ? '' : ':'+ohi_KBD_type;
	var name='', link='', keyboardLayoutInfo = document.getElementById('keyboardLayoutInfo');

	if(keyboardLayoutInfo) {
		if(KE=='En') {
			name = '<strong>[영문' + kbd + ']</strong> ';
			if(En_type=='QWERTY') name += '쿼티 (QWERTY)';
			else if(En_type=='Dvorak') name += '드보락 (Dvorak)';
			else if(En_type=='Colemak') name += '콜맥 (Colemak)';
		}
		else {
			var beol = '3';
			if(current_layout.type_name.substr(0,1)=='2') beol = '2';
			else if(current_layout.type_name.substr(0,1)=='4') beol = '4';
			name = '<strong>[한글 ' + beol + '벌식' + kbd + ']</strong> ';

			var full_name = current_layout.full_name;
			if(is_old_hangeul_input()) {
				if(typeof find_layout_info('Ko', current_layout.old_hangeul_layout_type_name).full_name != 'undefined')
					full_name = find_layout_info('Ko', current_layout.old_hangeul_layout_type_name).full_name;
			}
			if(typeof current_layout.full_name != 'undefined') name += full_name;

			if(is_old_hangeul_input() && typeof current_layout.old_hangeul_layout_type_name != 'undefined'
			 && typeof find_layout_info('Ko', current_layout.old_hangeul_layout_type_name).link != 'undefined'
			 && find_layout_info('Ko', current_layout.old_hangeul_layout_type_name).link)
				link = find_layout_info('Ko', current_layout.old_hangeul_layout_type_name).link;
			else if(typeof current_layout.link != 'undefined' && current_layout.link)
				link = current_layout.link;

			if(link) name += ' <a href="'+link+'" target="_blank">ⓘ</a>';
		}

		keyboardLayoutInfo.innerHTML = name;
	}
}

function find_layout_info(KE, type_name) {
	if(typeof type_name == 'undefined' || !type_name) return false;
	var i,j;
	var a=[keyboard_layouts];
	if(typeof additional_layouts != 'undefined') a.push(additional_layouts);
	if(typeof test_layouts != 'undefined') a.push(test_layouts);
	
	for(i=0;i<a.length;++i) {
		for(j=0;j<a[i].length;++j) {
			if(KE==a[i][j].KE && typeof a[i][j].type_name != 'undefined' && type_name.toLowerCase()==a[i][j].type_name.toLowerCase()) {
				return a[i][j];
			}
		}
	}
	return false;
}

function ohiChange(KE, type_name) {
	var f=document.getElementById('inputText');
	inputText_focus();
	
	if(prev_phoneme.length) {
		if(f) complete_hangeul_syllable(f);
	}

	esc_ext_layout();
	
	if(KE.toLowerCase()=='en') KE='En';
	else if(KE.toLowerCase()=='ko' || KE.toLowerCase()=='k2' || KE.toLowerCase()=='k3') KE='Ko';

	ohi_KE = ohi_KE.replace(/(En|Ko)/, KE.substr(0,2));
	
	var layout = find_layout_info(KE, type_name);
	if(current_layout) current_layout = layout;
	else return;

	if(KE=='En') En_type = current_layout.type_name;
	else Ko_type = current_layout.type_name;

	ohiStart();
	show_keyboard_layout(KE=='En' ? En_type : Ko_type);
}

function ohiChange_between_same_type(type) {	// 같은 한·영 종류의 배열 바꾸기 (Ko는 주요 배열만 간추림)
	var i,j=-1;
	var En_type_array = ['QWERTY','Dvorak','Colemak'];
	var Ko_type_array = ['2-KSX5002','2-KPS9256','Sin3-P2','3m-Semoe','3-P3'];

	if(type=='En') {
		for(i=0;i<En_type_array.length;++i) {
			if(En_type.toLowerCase()==En_type_array[i].toLowerCase()) {
				j=i;
			}
		}
		En_type = En_type_array[(j+1)%i];
		ohiChange('En',En_type);
		return;
	}

	var a=[keyboard_layouts];
	if(typeof additional_layouts != 'undefined') a.push(additional_layouts);
	if(typeof test_layouts != 'undefined') a.push(test_layouts);

	for(i=0;i<Ko_type_array.length;++i) {
		if(type=='K2' && Ko_type_array[i].substr(0,1)!='2' || type=='K3' && Ko_type_array[i].substr(0,1)=='2') {
			// 두벌식 자판 이름(type_name)의 앞에 2이 붙지 않았거나 세벌식 자판 이름에 2이 붙은 것은 뺌
			Ko_type_array.splice(i--,1);
		}
	}

	if(type!='Ko') {
		// type이 K2이면 Ko_type_array에 모든 두벌식 자판 이름을 넣고, K3이면 모든 세벌식 자판 이름을 넣음
		for(i=0;i<a.length;++i) {
			for(j=0;j<a[i].length;++j) {
				if(a[i][j].KE=='Ko' && typeof a[i][j].type_name != 'undefined' && Ko_type_array.indexOf(a[i][j].type_name)<0) {
					if(type=='K2' && a[i][j].type_name.substr(0,1)=='2') {
						Ko_type_array.push(a[i][j].type_name);
					}
					if(type=='K3' && a[i][j].type_name.substr(0,1)!='2') {
						Ko_type_array.push(a[i][j].type_name);
					}
				}
			}
		}
	}

	for(i=0;i<Ko_type_array.length;++i) {
		if(Ko_type.toLowerCase()==Ko_type_array[i].toLowerCase()) j=i;
	}

	if(type!='Ko' && (Ko_type.substr(0,1)=='2'&&Ko_type_array[(j+1)%i].substr(0,1)!='2' || Ko_type.substr(0,1)!='2'&&Ko_type_array[(j+1)%i].substr(0,1)=='2')) Ko_type = Ko_type_array[0];
	else Ko_type = Ko_type_array[(j+1)%i];
	ohiChange('Ko',Ko_type);
}

function ohiChange_KE(type) {	// 한·영 상태 바꾸기
	var KE = ohi_KE;

	if(type === undefined || !type) {
		if(KE=='En') ohiChange('Ko',Ko_type);
		else if(KE=='Ko') ohiChange('En',En_type);
	}
	else if(type=='En') {
		ohiChange('En',En_type);
	}
	else if(type=='Ko') {
		ohiChange('Ko',Ko_type);
	}
}

function ohiChange_KBD_type(type) {	// 기준 자판 바꾸기
	if(type === undefined || !type) {
		ohi_KBD_type = ohi_KBD_type=='QWERTY' ? 'QWERTZ' : ohi_KBD_type=='QWERTZ' ? 'AZERTY' : 'QWERTY';
		ohiStart();
	}
	else {
		ohi_KBD_type = type;
		ohiStart();
	}
	show_keyboard_layout(option.show_layout);
}

function ohiChange_enable_sign_ext(op) {
	if(op=='off' || op=='0') option.enable_sign_ext = 0;
	else option.enable_sign_ext = 1;
	show_keyboard_layout(option.show_layout);

	var checkbox = document.getElementsByName('sign_extension');
	if(checkbox && typeof checkbox[0].checked != 'undefined') checkbox[0].checked = option.enable_sign_ext;
}

function ohiChange_enable_old_hangeul_input(op) {
	if(typeof op != 'undefined') {
		if(op=='off' || op=='0') option.enable_old_hangeul_input = 0;
		else option.enable_old_hangeul_input = 1;
	}
	var f=document.getElementById('inputText');
	if(f) complete_hangeul_syllable(f);
	Sin3_hangeul_extension();
	show_keyboard_layout(option.show_layout);
}

function ohiChange_enable_phonemic_writing(op) {
	if(op=='off' && op=='0') option.enable_phonemic_writing = 0;
	else option.enable_phonemic_writing = 1;

	var f=document.getElementById('inputText');
	if(f) complete_hangeul_syllable(f);
	show_keyboard_layout(option.show_layout);
}

function ohiChange_force_normal_typing(op) { // 모아치기 자판을 이어치기(일반 타자법)으로 치게 하기
	if(typeof op != 'undefined' && op=='off' || op=='0') option.force_normal_typing = 0;
	else option.force_normal_typing = 1;

	var checkbox = document.getElementsByName('force_normal_typing');
	if(checkbox && typeof checkbox[0].checked != 'undefined') checkbox[0].checked = option.force_normal_typing;	
}

function Sin3_hangeul_extension() {
	if(Ko_type.substr(0,5)!='Sin3-') return;
	opt = document.getElementById('option_enable_Sin3_diphthong_key');
	if(opt) {
		if(option.enable_old_hangeul_input && current_layout.type_name.substr(0,5)=='Sin3-') opt.style.display = 'block';
		else opt.style.display = 'none';
	}
}

function ohiKeyswap(key,e) {
	var KE=ohi_KE;
	var i=0, swaped = [];
	if(ohi_KBD_type=='QWERTZ') swaped=[89,90,90,89,121,122,122,121];
	if(ohi_KBD_type=='AZERTY') swaped=[65,81,81,65,87,90,90,87,97,113,113,97,119,122,122,119,77,58,109,59,44,109,58,46,59,44];

	while(swaped[i] && swaped[i]!=key) i+=2;
	if(i!=swaped.length) c=swaped[i+1];
	if(KE!='En' || En_type!='QWERTY') {
	// 영문 쿼티 자판이 아니면 Caps Lock이 적용되지 않게 함
		if(key>64 && key<91 && !e.shiftKey) key+=32;
		if(key>96 && key<123 && e.shiftKey) key-=32;
	}

	return key;
}

function ohiKeypress(e) {
	if(option.turn_off_OHI) return false;
	if(onkeypress_skip) return false;
	var KE=ohi_KE.substr(0,2);
	var key_pressed=0; // 특수 기능 글쇠가 아닌 글쇠(일반 글쇠)가 눌렸는지
	var e=e||window.event, f=e.target||e.srcElement, n=f.nodeName||f.tagName, key=e.which||e.which==0?e.which:e.keyCode;

	key=ohiKeyswap(key,e);

	if(f.type=='text' && n=='INPUT' || n=='TEXTAREA') {
		if((key==13 || key==32) && !e.ctrlKey && !e.shiftKey && !e.altKey) {
			complete_hangeul_syllable(f);
			if(key==13) { // 줄바꾸개 (enter)
				ohiInsert(f,0,13);
			}
			else if(key==32) { // 사이띄개 (space bar)
				backspaces_for_restoring_prev_state=0;
				if(prev_phoneme.length) {
					prev_phoneme.splice(0);
					prev_phoneme_R.splice(0);
					prev_combined_phoneme.splice(0);
					if(!sign_ext_state) ohiInsert(f,0,0);
				}
				if(!(browser=="MSIE" && browser_ver<9)) {
					if(e.preventDefault) e.preventDefault();
				}
				ohiInsert(f,0,key);
			}
			esc_ext_layout();
		}
		else if((key==10 || key==13 || key==32) && (e.ctrlKey^e.shiftKey)) { // Toggle
			if(e.preventDefault) e.preventDefault();
			if((key==10 || key==13) && e.ctrlKey) {
				ohiChange_KBD_type(); // 기준 자판 바꾸기
			}
			else if(key==32 && (e.ctrlKey || e.shiftKey)) {
				ohiChange_KE();	// 한·영 상태 바꾸기
			}
			key_pressed=0;
		}
		else if(key==49 && e.altKey && !e.ctrlKey && !e.shiftKey) {	// 영문 배열 종류 바꾸기 (QWERTY/Dvorak/Colemak)
			ohiChange_between_same_type('En');
			if(e.preventDefault) e.preventDefault();
			key_pressed=0;
		}
		else if(key==50 && e.altKey && !e.ctrlKey && !e.shiftKey) {	// 두벌식 배열 종류 바꾸기 (한국/조선 표준 자판)
			ohiChange_between_same_type('K2');
			if(e.preventDefault) e.preventDefault();
			key_pressed=0;
		}
		else if(key==51 && e.altKey && !e.ctrlKey && !e.shiftKey) {	// 세벌식 배열 종류 바꾸기
			ohiChange_between_same_type('K3');
			if(e.preventDefault) e.preventDefault();
			key_pressed=0;
		}
		else if(ohi_KE.substr(0,2)=='En' && key>32 && key<127 && e.keyCode<127 && !e.altKey && !e.ctrlKey) {
			if(e.preventDefault) e.preventDefault();
			ohiRoman(f,e,key);
			key_pressed=1;
		}
		else if(ohi_KE.substr(0,2)!='En' && key>32 && key<127 && e.keyCode<127 && !e.altKey && !e.ctrlKey) {
			if(e.preventDefault) e.preventDefault();
			key_pressed=1;

			if(Ko_type.substr(0,3)=='3m-' && !option.force_normal_typing) {
				pressed_key_accumulation(f,e,key);
				if(e.shiftKey) {
				}
				else {
				}
			}
			else {
				if(document.selection && document.selection.createRange().text.length!=1) ohiQ=[0,0,0,0,0,0,0,0,0];
				if(f.selectionEnd+1 && f.selectionEnd-f.selectionStart!=1) ohiQ=[0,0,0,0,0,0,0,0,0];

				if(ohi_KE.substr(0,2)=='Ko') {
					if(current_layout.type_name.substr(0,2)=='2-') {ohiHangeul2(f,e,key);}
					else {
						if(!ohiHangeul3_abbreviation(f,e,key)) ohiHangeul3(f,e,key);
					}
				}
			}
		}
	}

	if(key_pressed) {
		tableKey_press(key);
		if(f.id=='inputText') show_NCR();
	}

	return false;
}

function ohiKeydown(e) {
	if(option.turn_off_OHI) {
		show_NCR();
		return false;
	}
	onkeypress_skip=0; // 참이면 ohiKeypress() 처리를 건너뜀
	onkeyup_skip=0; // 참이면 ohiKeyup() 처리를 건너뜀
	var i=0;
	var e=e||window.event, f=e.target||e.srcElement, n=f.nodeName||f.tagName, key=e.which||e.which==0?e.which:e.keyCode;
	var KE = ohi_KE;

	if(f.type=='text' && n=='INPUT' || n=='TEXTAREA') {
		if(e.keyCode>=96 && e.keyCode<=111) { // 오른쪽 숫자판(키패드) 글쇠일 때
			onkeypress_skip=1;
			esc_ext_layout();
			var c=Array(/*0*/48,/*1*/49,/*2*/50,/*3*/51,/*4*/52,/*5*/53,/*6*/54,/*7*/55,/*8*/56,/*9*/57,
			/***/42,/*+*/43,0,/*-*/45,/*.*/46,/*/*/47)[e.keyCode-96];
			ohiInsert(f,0,c);
			if(e.preventDefault) e.preventDefault();
	 		return false;
		}

		if(e.keyCode==8) {	// Backspace
			tableKey_press(e.keyCode);
			if(Ko_type.substr(0,3)=='3m-' && !option.force_normal_typing) {
				if(e.preventDefault) e.preventDefault();
				pressed_key_accumulation(f,e,key);
				onkeyup_skip=0;
				return false;
			}
			else if(/*Ko_type.substr(0,4)!='Sin3' && */option.abbreviation && backspaces_for_restoring_prev_state) {
			// 이어치기 자판으로 줄임말을 넣은 뒤
				ohiHangeul_moa_backspace(f,e);
				return false;
			}

			if(!ohiHangeul_backspace(f,e)) return false;
			if(e.preventDefault) e.preventDefault();
			ohiBackspace(f);
			onkeyup_skip=1;
		}

		if(e.keyCode==13) { // Enter (한글 조합 상태)
			tableKey_press(e.keyCode);
			if(Ko_type.substr(0,3)=='3m-' && !option.force_normal_typing) {
				if(e.preventDefault) e.preventDefault();
				pressed_key_accumulation(f,e,key);
				esc_ext_layout();
				return false;
			}
		}

		if(e.keyCode==32) { // Space
			tableKey_press(e.keyCode);
			if(prev_phoneme.length) {
				ohiSelection(f,0);
			}
			if(Ko_type.substr(0,3)=='3m-' && !option.force_normal_typing) {
				if(!pressing_keys) return false;
				if(e.preventDefault) e.preventDefault();
				pressed_key_accumulation(f,e,key);
				backspaces_for_restoring_prev_state=0;
				onkeyup_skip=0;
				return false;
			}
		}

		if(e.keyCode==20) { // Caps Lock
			//tableKey_press(e.keyCode);
		}

		if((e.keyCode>=35 && e.keyCode<=40) || e.keyCode==45 || e.keyCode==46) { // end(35), home(36), 화살표(37~40), insert(45), del(46)
			if(prev_phoneme.length || ohiQ[0]+ohiQ[3]+ohiQ[6]) { // 한글 조합 상태
				if(!option.phonemic_writing || Ko_type.substr(0,4)!='Sin3') {
					complete_hangeul_syllable(f);
					ohiInsert(f,0,32);
					ohiBackspace(f);
				}
			}
			esc_ext_layout();
		}
/*
		if(e.keyCode==17) { // Ctrl
		}
		if(e.keyCode==18) { // Alt
		}
		if(e.keyCode==91 || e.keyCode==93) { // menu
		}
		if(e.keyCode>=112 && e.keyCode<=123) { // F1~F12
		}
*/
		if(e.keyCode==16) { // shift
			if(KE=='Ko' && Ko_type=='2-Gaon26KM') {
				pressed_key_accumulation(f,e,key);
				tableKey_press(e.keyCode);
			}
			if(KE=='Ko' && Ko_type=='4t-1985') {
				tableKey_press(e.keyCode);
			}
			if(Ko_type.substr(0,3)=='3m-' && !option.force_normal_typing) {
				tableKey_press(e.keyCode);
			}
		}

		if(e.keyCode<45 && e.keyCode!=16) {
			if(option.phonemic_writing && is_galmadeuli_input() && (ohiQ[0]+ohiQ[3]+ohiQ[6])) {
			// 갈마들이 자판 풀어쓰기
				convert_syllable_into_phonemes(f);
			}
			if(prev_phoneme.length) {	// 옛한글 자판
				complete_hangeul_syllable(f);
			}
			esc_ext_layout();
			backspaces_for_restoring_prev_state=0;
			ohiInsert(f,0,0);
		}
	}
	if(f.id=='inputText') show_NCR();
}

function ohiKeyup(e) {
	var e=e||window.event, f=e.target||e.srcElement;
	var KE=ohi_KE.substr(0,2);
	var exceptional_keys = [32,13,8,16]; // 사이띄개(32), 줄바꾸개(13), 뒷걸음쇠(8), 윗글쇠(16)
	
	if(onkeyup_skip || option.turn_off_OHI || (e.keyCode<47 && exceptional_keys.indexOf(e.keyCode)<0)) {
	}
	else if(!option.force_normal_typing && KE=='Ko' && Ko_type.substr(0,3)=='3m-') {	
		if(e.keyCode==16 ||  pressing_keys && !--pressing_keys) { // 윗글쇠(16)를 떼었거나 모든 글쇠를 뗌
			while(pressed_keys.indexOf(16)>=0) pressed_keys.splice(pressed_keys.indexOf(16),1);
			if(pressed_keys.length) ohiHangeul3_moa(f,e);
			pressed_keys=[];
			pressing_keys=0;
		}
	}
	else if(KE=='Ko' && Ko_type=='2-Gaon26KM') {
		if(pressing_keys && !--pressing_keys) {
			if(pressed_keys.length==1 && pressed_keys[0]==16 && e.keyCode==16) {
				ohiInsert(f,0,32);
				ohiBackspace(f);
			}
			pressed_keys=[];
		}
	}
	else if(KE=='Ko' && Ko_type=='4t-1985') {
		if(e.keyCode==16) {
			shift_lock=1;
		}
	}

	if(f.id=='inputText') show_NCR();
}

function pressed_key_accumulation(f,e,key) {
	if(pressed_keys.length && pressed_keys[pressed_keys.length-1]==key) {
	// 한 글쇠가 오래 눌려서 같은 문자가 들어왔을 때
		ohiHangeul3_moa(f,e);
		pressed_keys=[];
		pressing_keys=0;
		backspaces_for_restoring_prev_state=0;
		if(key==8) {
			ohiHangeul_moa_backspace(f,e);
			return;
		}
		ohiHangeul3(f,e,key);
	}
	else {
		++pressing_keys;
		pressed_keys.push(key);
	}
}

function inputText_focus() {
	var f=document.getElementById('inputText');
	if(f) f.focus();
}

function inputText_rows(r) {
	var f=document.getElementById('inputText');
	if(f) f.rows=r.toString();
}

function url_query() {
	var field, value, TF;
	var address = unescape(location.href);
	var fields = (address.slice(address.indexOf('?')+1,address.length)).split('&');
	for(var i=0; i<fields.length; ++i){
		field = fields[i].split('=')[0].toLowerCase();
		value = fields[i].split('=')[1];
		TF = !value || value=='0' || value.toLowerCase=='f' || value.toLowerCase=='false' ? 0 : 1;
		if(value===undefined || !value) continue;

		if(field == 'kbd') { // 기준 자판
			if(value.toUpperCase()=='QWERTY' || value.toUpperCase()=='QWERTZ' || value.toUpperCase()=='AZERTY')
				ohiChange_KBD_type(value.toUpperCase());
		}
		else if(field == 'en')	{ // 영문 자판
			ohiChange('En',value.toLowerCase());
		}
		else if(field == 'ko' || field == 'k2' || field == 'k3') { // 한글 자판
			ohiChange('Ko',value.toLowerCase());
		}
		else if(field == 'statusbar') { // 오른쪽 아래에 보람줄 나타내기
			setTimeout(function(){show_ohiStatusBar(TF);}, 250);
		}
		else if(field == 'sign_ext') { // 기호 확장
			ohiChange_enable_sign_ext(TF);
		}
		else if(field == 'double_final_ext' || field == 'df_ext') { // 겹받침 확장 (신세벌식)
			ohiChange_enable_double_final_ext(TF);
		}
		else if(field == 'sl' || field == 'square layout') {
			option.square_layout = TF;
		}
		else if(field == 'normal_typing' || field == 'nt') { // 모아치기 자판을 이어치기로 쓰기
			option.force_normal_typing = TF;
		}
		else if(field == 'ncr') { // HTML 문자 참조 보이기
			option.NCR = TF;
		}
		else if(field == 'ncr_only_cgg') { // 첫가끝 조합형 한글만 HTML 문자 참조로 바꾸어 보이기
			NCR_option.convert_only_CGG_encoding = TF;
		}
		else if(field == 'y') { // 신세벌식 자판으로 옛한글 겹낱자 조합하기
			option.enable_old_hangeul_input = TF;
			ohiChange_enable_old_hangeul_input();
		}
		else if(field == 'diph' || field == 'diphthong') { // 신세벌식 자판으로 옛한글을 조합할 때 오른쪽 아랫글 자리에서 홀소리를 넣을지
			option.enable_Sin3_diphthong_key = TF;
		}
		else if(field == 'pw' || field == 'phonemic_writing') { // 풀어쓰기
			option.phonemic_writing = TF;
		}
		else if(field == 'abbr' || field == 'abbreviation') { // 이어치기 자판에서 줄임말 기능 쓰기
			option.abbreviation = TF;
		}
		else if(field == 'cc' || field == 'convenience_combination') { // 입력 편의를 높이는 한글 편의 조합 쓰기 (조합표가 지정되어 있을 때)
			option.convenience_combination = TF;
		}
		else if(field == 'sun' || field == 'sunalae') { // 두벌식 자판 순아래 조합
			option.sunalae = TF;
		}
		else if(field == 'row') { // 글상자(textarea)의 줄 수
			 setTimeout(function(){inputText_rows(value);}, 250);
		}
	}
}

function tableKey_press(key) {
	var shift1 = document.getElementById('key41');
	var shift2 = document.getElementById('key52');

	if(!option.show_layout || !shift1) return;

	shift1.className = shift1.className.substr(0,2);
	shift2.className = shift2.className.substr(0,2);
	var layout_name = current_layout.type_name;

	if(key==188) key=44; // , 자리 글쇠
	if(key==190) key=46; // . 자리 글쇠
	if(key==222) key=39; // ' 자리 글쇠
	if(key==219) key=91; // [ 자리 글쇠
	if(key==221) key=93; // ] 자리 글쇠
	if(key==220) key=92; // \ 자리 글쇠
	if(key==173) key=45; // - 자리 글쇠
	if(key==191) key=47; // / 자리 글쇠
	if(key==192) key=96; // ` 자리 글쇠
	
	if(key==16 || current_layout.type_name=='4t-1985'&&shift_lock) {
		shift1.className += ' pressed';
		shift2.className += ' pressed';
	}

	var key_td;
	for(j=0;j<dkey.length;++j) {
		if(j==41 || j==52) continue;
		key_td = document.getElementById('key'+j);
		key_td.className = key_td.className.replace(/ clicked| pressed/,'');
		if(key==dkey[j] || key==ukey[j] || (layout_name.substr(0,3)=='3m-' && !option.force_normal_typing && (pressed_keys.indexOf(dkey[j])>=0 || pressed_keys.indexOf(ukey[j])>=0))) {
			key_td.className += ' pressed';
		}

		if(key==ukey[j] && key!=dkey[j]) {
			shift1.className += ' pressed';
			shift2.className += ' pressed';
		}
	}
}

function tableKey_clicked(e, key_num, dk, uk){
	inputText_focus();
	var key, f = document.getElementById('inputText');
	var n=f.nodeName||f.tagName;
	if(!f || n!='TEXTAREA') return false;

	KE=ohi_KE.substr(0,2);

	var shiftlock = document.getElementById('key28');
	var shift1 = document.getElementById('key41');
	var shift2 = document.getElementById('key52');

	if(dk==20) {	// 배열표에서 Shift Lock이 눌렸을 때
		if(!shiftlock_click) {
			shiftlock.style.backgroundColor = 'orange';
			shiftlock_click = 1;
		}
		else {
			shiftlock.style.backgroundColor = '';
			shiftlock_click = 0;
		}
	}
	if(dk==16 && !shift_click) {	// 배열표에서 윗글쇠가 눌렸을 때
		shift_click = 1;
		shift1.style.backgroundColor = 'orange';
		shift2.style.backgroundColor = 'orange';
		return;
	}
	if((dk==32 || dk==13 || dk==9) && !shift_click) {	// 사이띄개(32), 줄바꾸개(13), Tab(9)
		complete_hangeul_syllable(f);
		esc_ext_layout();
		ohiInsert(f,0,dk);
		return;
	}
	if(dk==8 && !shift_click) {	// Backspace
		if(Ko_type.substr(0,4)!='Sin3' && option.abbreviation && backspaces_for_restoring_prev_state) {
		// 이어치기 자판으로 줄임말을 넣은 뒤
			if(!ohiQ[0]&&!ohiQ[3]&&!ohiQ[6]) ++backspaces_for_restoring_prev_state;
			ohiHangeul_moa_backspace(f,e);
			return false;
		}
		if(!ohiHangeul_backspace(f,e)) return;
		ohiBackspace(f);
		inputText_focus();
		esc_ext_layout();
		return;
	}

	if(dk==-1) { // 기준 자판 바꾸기 단추
		ohiChange_KBD_type();
		inputText_focus();
	}
	if(dk==-2) { // 영문 자판 바꾸기 단추
		ohiChange_between_same_type('En');
	}
	if(dk==-3) { // 한글 자판 바꾸기 단추
		ohiChange_between_same_type('Ko');
		inputText_focus();
	}
	if(dk==-11) {	// 3벌식 자판 바꾸기 단추
		ohiChange_between_same_type('K3');
		inputText_focus();
	}
	if(dk==-12) { // 2벌식 자판 바꾸기 단추
		ohiChange_between_same_type('K2');
	}
	if(dk==-13) { // 한·영 상태 바꾸기 단추
		ohiChange_KE();
		inputText_focus();
	}

	key = (shift_click+shiftlock_click)%2 ? uk : dk;
	if(ohi_KE.substr(0,2)=='En' && key>32 && key<127) ohiRoman(f,0,key);
	if(ohi_KE.substr(0,2)!='En' && key>32 && key<127) {
		if(document.selection && document.selection.createRange().text.length!=1) ohiQ=[0,0,0,0,0,0,0,0,0];
		if(KE=='Ko') {
			if(current_layout.type_name.substr(0,2)=='2-') ohiHangeul2(f,e,key);
			else {
				if(!ohiHangeul3_abbreviation(f,e,key)) ohiHangeul3(f,e,key);
			}
		}
	}

	for(var j=0;j<dkey.length;++j) {
		var key_td =document.getElementById('key'+j);
		key_td.className = key_td.className.replace(/ clicked| pressed/g,'');
	}
	
	if(dk!=16 && dk!=20) document.getElementById('key'+key_num).className += ' clicked';

	shift_click = 0;
	shift1.style.backgroundColor = '';
	shift2.style.backgroundColor = '';
}

function ohi_code_tables() {
	var i;

	ohi_cheos = [/*ㄱ*/128,/*ㄲ*/129,/*ㄴ*/131,/*ㄷ*/134,/*ㄸ*/135,/*ㄹ*/136,/*ㅁ*/144,/*ㅂ*/145,/*ㅃ*/146,/*ㅅ*/148,/*ㅆ*/149,/*ㅇ*/150,/*ㅈ*/151,/*ㅉ*/152,/*ㅊ*/153,/*ㅋ*/154,/*ㅌ*/155,/*ㅍ*/156,/*ㅎ*/157];
	ohi_ga = [/*ㅏ*/66,/*ㅐ*/67,/*ㅑ*/68,/*ㅒ*/69,/*ㅓ*/70,/*ㅔ*/71,/*ㅕ*/72,/*ㅖ*/73,/*ㅗ*/74,/*ㅘ*/75,/*ㅙ*/76,/*ㅚ*/77,/*ㅛ*/78,/*ㅜ*/79,/*ㅝ*/80,/*ㅞ*/81,/*ㅟ*/82,/*ㅠ*/83,/*ㅡ*/84,/*ㅢ*/85,/*ㅣ*/86];
	ohi_ggeut = [/*ㄱ*/1,/*ㄲ*/2,/*ㄳ*/3,/*ㄴ*/4,/*ㄵ*/5,/*ㄶ*/6,/*ㄷ*/7,/*ㄹ*/9,/*ㄺ*/10,/*ㄻ*/11,/*ㄼ*/12,/*ㄽ*/13,/*ㄾ*/14,/*ㄿ*/15,/*ㅀ*/16,
	/*ㅁ*/17,/*ㅂ*/18,/*ㅄ*/20,/*ㅅ*/21,/*ㅆ*/22,/*ㅇ*/23,/*ㅈ*/24,/*ㅊ*/26,/*ㅋ*/27,/*ㅌ*/28,/*ㅍ*/29,/*ㅎ*/30];

	ohi_hangeul_phoneme = ohi_cheos.concat(ohi_ga,ohi_ggeut);
	ohi_hotbadchim = [/*ㄱ*/1,/*ㄴ*/4,/*ㄷ*/7,/*ㄹ*/9,/*ㅁ*/17,/*ㅂ*/18,/*ㅅ*/21,/*ㅇ*/23,/*ㅈ*/24,/*ㅊ*/26,/*ㅋ*/27,/*ㅌ*/28,/*ㅍ*/29,/*ㅎ*/30];
	unicode_modern_hotbatchim = [/*ㄱ*/0x11A8,/*ㄴ*/0x11AB,/*ㄷ*/0x11AE,/*ㄹ*/0x11AF,/*ㅁ*/0x11B7,/*ㅂ*/0x11B8,/*ㅅ*/0x11BA,/*ㅇ*/0x11BC,/*ㅈ*/0x11BD,/*ㅊ*/0x11BE,/*ㅋ*/0x11BF,/*ㅌ*/0x11C0,/*ㅍ*/0x11C1,/*ㅎ*/0x11C2];

	compatibility_cheos = [0x3131,0x3132,0x3134,0x3137,0x3138,0x3139,0x3141,0x3142,0x3143,0x3145,0x3146,0x3147,0x3148,0x3149,0x314A,0x314B,0x314C,0x314D,0x314E];
	i=0x314F;	while(i<=0x3163) compatibility_ga.push(i++); compatibility_ga.push(0x318D);
	compatibility_ggeut = [0x3131,0x3132,0x3133,0x3134,0x3135,0x3136,0x3137,0x3139,0x313A,0x313B,0x313C,0x313D,0x313E,0x313F,0x3140,
	 0x3141,0x3142,0x3144,0x3145,0x3146,0x3147,0x3148,0x314A,0x314B,0x314C,0x314D,0x314E];
	compatibility_hangeul_phoneme = compatibility_cheos.concat(compatibility_ga, compatibility_ggeut);

	halfwidth_cheos = [0xFFA1,0xFFA2,0xFFA4,0xFFA7,0xFFA8,0xFFA9,0xFFB1,0xFFB2,0xFFB3,0xFFB5,0xFFB6,0xFFB7,0xFFB8,0xFFB9,0xFFBA,0xFFBB,0xFFBC,0xFFBD,0xFFBE];
	for(i=0;i<4;++i) for(j=0;j<(i==3?3:6);++j) halfwidth_ga.push(0xFFC2+i*8+j);
	halfwidth_ggeut = [0xFFA1,0xFFA2,0xFFA3,0xFFA4,0xFFA5,0xFFA6,0xFFA7,0xFFA9,0xFFAA,0xFFAB,0xFFAC,0xFFAD,0xFFAE,0xFFAF,0xFFB0,
	 0xFFB1,0xFFB2,0xFFB4,0xFFB5,0xFFB6,0xFFB7,0xFFB8,0xFFBA,0xFFBB,0xFFBC,0xFFBD,0xFFBE];
	halfwidth_hangeul_phoneme = halfwidth_cheos.concat(halfwidth_ga, halfwidth_ggeut);

	i=0x1100;	while(i<=0x115E) unicode_cheos.push(i++);
	i=0xA960;	while(i<=0xA97C) unicode_cheos.push(i++);
	i=0x1161;	while(i<=0x11A7) unicode_ga.push(i++);
	i=0xD7B0;	while(i<=0xD7C6) unicode_ga.push(i++);
	i=0x11A8;	while(i<=0x11FF) unicode_ggeut.push(i++);
	i=0xD7CB;	while(i<=0xD7FB) unicode_ggeut.push(i++);

	unicode_CGG_hangeul_phoneme = unicode_cheos.concat(unicode_ga, unicode_ggeut); // 유니코드 조합형 한글 낱자
	unicode_CGG_hangeul_filler = [0x115F,0x1160]; // 첫소리·가운뎃소리 채움 문자
	unicode_CGG_hangeul_sidedot = [0x302E,0x302F]; // 방점

	i=0x1100;	while(i<=0x1112) unicode_modern_cheos.push(i++);
	i=0x1161;	while(i<=0x1175) unicode_modern_ga.push(i++);
	i=0x11A8;	while(i<=0x11C2) unicode_modern_ggeut.push(i++);

	// 쿼티 자판 아랫글 배열 문자값
	dkey = [96,49,50,51,52,53,54,55,56,57,48,45,61,8,
	9,113,119,101,114,116,121,117,105,111,112,91,93,92,
	20,97,115,100,102,103,104,106,107,108,59,39,13,
	16,122,120,99,118,98,110,109,44,46,47,16,
	-1,-2,-3,32,-13,-12,-11];

	// 쿼티 자판 윗글 배열
	ukey = [126,33,64,35,36,37,94,38,42,40,41,95,43,8,
	9,81,87,69,82,84,89,85,73,79,80,123,125,124,
	20,65,83,68,70,71,72,74,75,76,58,34,13,
	16,90,88,67,86,66,78,77,60,62,63,16,
	-1,-2,-3,32,-13,-12,-11];
	
	shift_table = [
		0x0031,	/* 0x21 exclam: 1 */
		0x0027,	/* 0x22 quotedbl: apostrophe */
		0x0033,	/* 0x23 numbersign: 3 */
		0x0034,	/* 0x24 dollar: 4 */
		0x0035,	/* 0x25 percent: 5 */
		0x0037,	/* 0x26 ampersand: 7 */
		0x0022,	/* 0x27 apostrophe: quotatioin mark */
		0x0039,	/* 0x28 parenleft */
		0x0030,	/* 0x29 parenright */
		0x0038,	/* 0x2A asterisk: 8 */
		0x003D,	/* 0x2B plus: equal */
		0x003C,	/* 0x2C comma: less */
		0x005F,	/* 0x2D minus: underscore */
		0x003E,	/* 0x2E period: greater */
		0x003F,	/* 0x2F slash: question */
		0x0029,	/* 0x30 0: parenright */
		0x0021,	/* 0x31 1: exclam */
		0x0040,	/* 0x32 2: at */
		0x0023,	/* 0x33 3: numbersign */
		0x0024,	/* 0x34 4: dollar */
		0x0025,	/* 0x35 5: percent */
		0x005E,	/* 0x36 6: asciicircum */
		0x0026,	/* 0x37 7: ampersand */
		0x002A,	/* 0x38 8: asterisk */
		0x0028,	/* 0x39 9: parenleft */
		0x003B,	/* 0x3A colon: semicolon */
		0x003A,	/* 0x3B semicolon: colon */
		0x002C,	/* 0x3C less: comma */
		0x002B,	/* 0x3D equal: plus */
		0x002E,	/* 0x3E greater: period */
		0x002F,	/* 0x3F question: slash */
		0x0032,	/* 0x40 at: 2 */
		0x0061,	/* 0x41 A: a */
		0x0062,	/* 0x42 B: b */
		0x0063,	/* 0x43 C: c */
		0x0064,	/* 0x44 D: d */
		0x0065,	/* 0x45 E: e */
		0x0066,	/* 0x46 F: f */
		0x0067,	/* 0x47 G: g */
		0x0068,	/* 0x48 H: h */
		0x0069,	/* 0x49 I: i */
		0x006A,	/* 0x4A J: j */
		0x006B,	/* 0x4B K: k */
		0x006C,	/* 0x4C L: l */
		0x006D,	/* 0x4D M: m */
		0x006E,	/* 0x4E N: n */
		0x006F,	/* 0x4F O: o */
		0x0070,	/* 0x50 P: p */
		0x0071,	/* 0x51 Q: q */
		0x0072,	/* 0x52 R: r */
		0x0073,	/* 0x53 S: s */
		0x0074,	/* 0x54 T: t */
		0x0075,	/* 0x55 U: u */
		0x0076,	/* 0x56 V: v */
		0x0077,	/* 0x57 W: w */
		0x0078,	/* 0x58 X: x */
		0x0079,	/* 0x59 Y: y */
		0x007A,	/* 0x5A Z: z */
		0x007B,	/* 0x5B bracketleft: braceleft */
		0x007C,	/* 0x5C backslash: bar */
		0x007D,	/* 0x5D bracketright: braceright */
		0x0036,	/* 0x5E asciicircum: 6 */
		0x002D,	/* 0x5F underscore: minus */
		0x007E,	/* 0x60 quoteleft: asciitilde */
		0x0041,	/* 0x61 a: A */
		0x0042,	/* 0x62 b: B */
		0x0043,	/* 0x63 c: C */
		0x0044,	/* 0x64 d: D */
		0x0045,	/* 0x65 e: E */
		0x0046,	/* 0x66 f: F */
		0x0047,	/* 0x67 g: G */
		0x0048,	/* 0x68 h: H */
		0x0049,	/* 0x69 i: I */
		0x004A,	/* 0x6A j: J */
		0x004B,	/* 0x6B k: K */
		0x004C,	/* 0x6C l: L */
		0x004D,	/* 0x6D m: M */
		0x004E,	/* 0x6E n: N */
		0x004F,	/* 0x6F o: O */
		0x0050,	/* 0x70 p: P */
		0x0051,	/* 0x71 q: Q */
		0x0052,	/* 0x72 r: R */
		0x0053,	/* 0x73 s: S */
		0x0054,	/* 0x74 t: T */
		0x0055,	/* 0x75 u: U */
		0x0056,	/* 0x76 v: V */
		0x0057,	/* 0x77 w: W */
		0x0058,	/* 0x78 x: X */
		0x0059,	/* 0x79 y: Y */
		0x005A,	/* 0x7A z: Z */
		0x005B,	/* 0x7B braceleft: bracketleft */
		0x005C,	/* 0x7C bar: backslash */
		0x005D,	/* 0x7D braceright: bracketright */
		0x0060	/* 0x7E asciitilde: quoteleft */
	];

} // ohi_code_tables()


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
if(!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(searchElement, fromIndex) {
		var k;
		if(!this) throw new TypeError('"this" is null or not defined');
		var O=Object(this);
		var len=O.length >>> 0;
		if(len===0) return -1;
		var n= +fromIndex || 0;
		if(Math.abs(n) === Infinity) n=0;
		if(n>=len) return -1;
		k = Math.max(n>=0 ? n : len-Math.abs(n), 0);
		while(k<len) {
			var kValue;
			if (k in O && O[k] === searchElement) return k;
			k++;
		}
		return -1;
	};
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr
if('ab'.substr(-1) != 'b') {
	String.prototype.substr = function(substr) {
		return function(start, length) {
			if(start<0) start=this.length+start;
			return substr.call(this, start, length);
		}
	}(String.prototype.substr);
}

ohi_code_tables();
browser_detect();

ohiStart();
url_query();

//show_ohiStatusBar(0);	// 보람줄(상태 표시줄) 감추기
//ohiChange_enable_sign_ext(0);	// 세벌식 자판의 기호 확장 기능 끄기
//ohiChange_force_normal_typing(1); // 모아치기 자판을 이어치기 방식으로 쓰게 하기