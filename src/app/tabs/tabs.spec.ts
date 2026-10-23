import {beforeEach, describe, expect, it, vitest} from 'vitest';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TabsComponent} from './tabs';
import {TabData} from './tabs.model';
import {MOCK_TABS} from '../testing/testing-data';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe("TabsComponent", () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;
  let de: DebugElement;
  const mockTabs: TabData[] = MOCK_TABS;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(TabsComponent);
    de = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tabs', mockTabs);
    fixture.detectChanges();
  })

  it('should create the tabs component', () => {
    expect(component).toBeDefined();
  })

  it('should render the correct number of tabs', () => {
    const buttons = de.queryAll(By.css(".tab-link"))
    expect(buttons.length).toBe(2);
    const buttonText = buttons[0].nativeElement.textContent as string;
    expect(buttonText?.trim()).toContain("Beginner");
    const buttonText2 = buttons[1].nativeElement.textContent as string;
    expect(buttonText2?.trim()).toContain("Advanced");
  })


  it('should apply the active class to the selected tab', () => {
    fixture.componentRef.setInput('activeTab', 'advanced');
    fixture.detectChanges();
    const button = de.query(By.css(".tab-link:last-child"));
    expect(button.nativeElement.classList).toContain("active");
  })

  it('should emit activeTab when a tab is clicked', () => {
    const button = de.query(By.css(".tab-link:last-child"));
    button.nativeElement.click();
    fixture.detectChanges();
    expect(component.activeTab()).toBe('advanced');
  })

  it('should emit tabChanged when a tab is clicked', () => {
    const tabChangedSpy = vitest.spyOn(component.tabChanged, 'emit');
    const button = de.query(By.css(".tab-link:last-child"));
    button.nativeElement.click();
    fixture.detectChanges();
    expect(tabChangedSpy).toHaveBeenCalledWith("advanced");
  })

})
