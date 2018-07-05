(function() {
  var Alarms, changeTime, currentAlarmNumber, getFrequencyText, setAlarm,
    indexOf = [].indexOf;

  Alarms = [];

  currentAlarmNumber = null;

  changeTime = function(value, max, actionType) {
    if (actionType === 'increase') {
      value++;
      if (value > max) {
        value = 0;
      }
    } else {
      value--;
      if (value < 0) {
        value = max;
      }
    }
    if (value < 10) {
      value = `0${value}`;
    }
    return value;
  };

  getFrequencyText = function(frequency) {
    var days;
    days = ['Mo', 'Tue', 'We', 'Th', 'Fr', 'Sa', 'Su'].filter(function(element, index) {
      return indexOf.call(frequency, index) >= 0;
    });
    if (days.length === 7) {
      days = ['Everyday'];
    }
    return days.join(' ');
  };

  setAlarm = function(alarmNumber, hours, minutes, frequency) {
    var $alarm_card;
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    $alarm_card = $($('.alarm_card')[alarmNumber]);
    $alarm_card.find('.time').html(`${hours}:${minutes}`);
    $alarm_card.find('.frequency').html(getFrequencyText(frequency));
    return Alarms[alarmNumber] = {
      hours: hours,
      minutes: minutes,
      frequency: frequency
    };
  };

  $(function() {
    $('.switcher').on('click', function(e) {
      e.stopPropagation();
      return $(this).toggleClass('on');
    });
    $('.alarm_card').on('click', function() {
      var $day, currentAlarm, hours, minutes;
      $day = $('.day');
      $day.removeClass('active');
      window.currentAlarmNumber = $(this).data('index');
      currentAlarm = Alarms[window.currentAlarmNumber];
      currentAlarm.frequency.forEach(function(value) {
        return $($day[value]).addClass('active');
      });
      hours = currentAlarm.hours;
      if (hours < 10) {
        hours = `0${hours}`;
      }
      minutes = currentAlarm.minutes;
      $('.hours .value').text(hours);
      $('.minutes .value').text(minutes);
      $('.alarm_cards').removeClass('shown').addClass('hidden');
      return $('.alarm_change_card_wrapper').removeClass('hidden').addClass('shown');
    });
    $('.day').on('click', function() {
      return $(this).toggleClass('active');
    });
    $('.saving_button').on('click', function() {
      var frequency, hours, minutes;
      $('.alarm_cards').removeClass('hidden').addClass('shown');
      $('.alarm_change_card_wrapper').removeClass('shown').addClass('hidden');
      hours = parseInt($('.hours .value').text());
      minutes = parseInt($('.minutes .value').text());
      frequency = [];
      $('.day').each(function(index, element) {
        if ($(element).hasClass('active')) {
          return frequency.push(index);
        }
      });
      return setAlarm(window.currentAlarmNumber, hours, minutes, frequency);
    });
    
    //####### Set time ########
    $('.hours .up').on('click', function() {
      var newHours;
      newHours = changeTime(parseInt($('.hours .value').text()), 23, 'increase');
      return $('.hours .value').text(newHours);
    });
    $('.hours .down').on('click', function() {
      var newHours;
      newHours = changeTime(parseInt($('.hours .value').text()), 23, 'decrease');
      return $('.hours .value').text(newHours);
    });
    $('.minutes .up').on('click', function() {
      var newMinutes;
      newMinutes = changeTime(parseInt($('.minutes .value').text()), 59, 'increase');
      return $('.minutes .value').text(newMinutes);
    });
    $('.minutes .down').on('click', function() {
      var newMinutes;
      newMinutes = changeTime(parseInt($('.minutes .value').text()), 59, 'decrease');
      return $('.minutes .value').text(newMinutes);
    });
    setAlarm(0, 18, 0, [0, 1, 2, 3, 4, 5, 6]);
    setAlarm(1, 6, 0, [1, 2, 3]);
    return setAlarm(2, 12, 0, [3, 4, 5, 6]);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLE1BQUEsRUFBQSxVQUFBLEVBQUEsa0JBQUEsRUFBQSxnQkFBQSxFQUFBLFFBQUE7SUFBQTs7RUFBQSxNQUFBLEdBQVM7O0VBQ1Qsa0JBQUEsR0FBcUI7O0VBRXJCLFVBQUEsR0FBYSxRQUFBLENBQUMsS0FBRCxFQUFRLEdBQVIsRUFBYSxVQUFiLENBQUE7SUFDWCxJQUFHLFVBQUEsS0FBYyxVQUFqQjtNQUNFLEtBQUE7TUFDQSxJQUFhLEtBQUEsR0FBUSxHQUFyQjtRQUFBLEtBQUEsR0FBUSxFQUFSO09BRkY7S0FBQSxNQUFBO01BSUUsS0FBQTtNQUNBLElBQWUsS0FBQSxHQUFRLENBQXZCO1FBQUEsS0FBQSxHQUFRLElBQVI7T0FMRjs7SUFPQSxJQUF1QixLQUFBLEdBQVEsRUFBL0I7TUFBQSxLQUFBLEdBQVEsQ0FBQSxDQUFBLENBQUEsQ0FBSSxLQUFKLENBQUEsRUFBUjs7V0FDQTtFQVRXOztFQVdiLGdCQUFBLEdBQW1CLFFBQUEsQ0FBQyxTQUFELENBQUE7QUFDakIsUUFBQTtJQUFBLElBQUEsR0FBTyxDQUFDLElBQUQsRUFBTyxLQUFQLEVBQWMsSUFBZCxFQUFvQixJQUFwQixFQUEwQixJQUExQixFQUFnQyxJQUFoQyxFQUFzQyxJQUF0QyxDQUEyQyxDQUFDLE1BQTVDLENBQW1ELFFBQUEsQ0FBQyxPQUFELEVBQVUsS0FBVixDQUFBO2FBQ3hELGFBQVMsU0FBVCxFQUFBLEtBQUE7SUFEd0QsQ0FBbkQ7SUFHUCxJQUF1QixJQUFJLENBQUMsTUFBTCxLQUFlLENBQXRDO01BQUEsSUFBQSxHQUFPLENBQUMsVUFBRCxFQUFQOztXQUNBLElBQUksQ0FBQyxJQUFMLENBQVUsR0FBVjtFQUxpQjs7RUFPbkIsUUFBQSxHQUFXLFFBQUEsQ0FBQyxXQUFELEVBQWMsS0FBZCxFQUFxQixPQUFyQixFQUE4QixTQUE5QixDQUFB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cm1OdW1iZXIgPSBudWxsXG5cbmNoYW5nZVRpbWUgPSAodmFsdWUsIG1heCwgYWN0aW9uVHlwZSkgLT5cbiAgaWYgYWN0aW9uVHlwZSBpcyAnaW5jcmVhc2UnXG4gICAgdmFsdWUrK1xuICAgIHZhbHVlID0gMCBpZiB2YWx1ZSA+IG1heFxuICBlbHNlXG4gICAgdmFsdWUtLVxuICAgIHZhbHVlID0gbWF4IGlmIHZhbHVlIDwgMFxuXG4gIHZhbHVlID0gXCIwI3t2YWx1ZX1cIiBpZiB2YWx1ZSA8IDEwXG4gIHZhbHVlXG5cbmdldEZyZXF1ZW5jeVRleHQgPSAoZnJlcXVlbmN5KSAtPlxuICBkYXlzID0gWydNbycsICdUdWUnLCAnV2UnLCAnVGgnLCAnRnInLCAnU2EnLCAnU3UnXS5maWx0ZXIgKGVsZW1lbnQsIGluZGV4KSAtPlxuICAgIGluZGV4IGluIGZyZXF1ZW5jeVxuICBcbiAgZGF5cyA9IFsnRXZlcnlkYXknXSBpZiBkYXlzLmxlbmd0aCBpcyA3XG4gIGRheXMuam9pbiAnICdcbiAgXG5zZXRBbGFybSA9IChhbGFybU51bWJlciwgaG91cnMsIG1pbnV0ZXMsIGZyZXF1ZW5jeSkgLT5cbiAgbWludXRlcyA9IFwiMCN7bWludXRlc31cIiBpZiBtaW51dGVzIDwgMTBcbiAgJGFsYXJtX2NhcmQgPSAkKCQoJy5hbGFybV9jYXJkJylbYWxhcm1OdW1iZXJdKVxuICAkYWxhcm1fY2FyZC5maW5kKCcudGltZScpLmh0bWwgXCIje2hvdXJzfToje21pbnV0ZXN9XCJcbiAgJGFsYXJtX2NhcmQuZmluZCgnLmZyZXF1ZW5jeScpLmh0bWwgZ2V0RnJlcXVlbmN5VGV4dChmcmVxdWVuY3kpXG4gICAgXG4gIEFsYXJtc1thbGFybU51bWJlcl0gPVxuICAgIGhvdXJzOiBob3Vyc1xuICAgIG1pbnV0ZXM6IG1pbnV0ZXNcbiAgICBmcmVxdWVuY3k6IGZyZXF1ZW5jeVxuXG4kIC0+XG4gICQoJy5zd2l0Y2hlcicpLm9uICdjbGljaycsIChlKSAtPlxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAkKEApLnRvZ2dsZUNsYXNzICdvbidcbiAgXG4gICQoJy5hbGFybV9jYXJkJykub24gJ2NsaWNrJywgLT5cbiAgICAkZGF5ID0gJCgnLmRheScpXG4gICAgJGRheS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICBcbiAgICB3aW5kb3cuY3VycmVudEFsYXJtTnVtYmVyID0gJChAKS5kYXRhKCdpbmRleCcpXG4gICAgY3VycmVudEFsYXJtID0gQWxhcm1zW3dpbmRvdy5jdXJyZW50QWxhcm1OdW1iZXJdXG4gICAgICAgIFxuICAgIGN1cnJlbnRBbGFybS5mcmVxdWVuY3kuZm9yRWFjaCAodmFsdWUpIC0+XG4gICAgICAkKCRkYXlbdmFsdWVdKS5hZGRDbGFzcygnYWN0aXZlJylcbiAgICBcbiAgICBob3VycyA9IGN1cnJlbnRBbGFybS5ob3Vyc1xuICAgIGhvdXJzID0gXCIwI3tob3Vyc31cIiBpZiBob3VycyA8IDEwXG4gICAgbWludXRlcyA9IGN1cnJlbnRBbGFybS5taW51dGVzXG4gICAgJCgnLmhvdXJzIC52YWx1ZScpLnRleHQoaG91cnMpXG4gICAgJCgnLm1pbnV0ZXMgLnZhbHVlJykudGV4dChtaW51dGVzKVxuICAgIFxuICAgICQoJy5hbGFybV9jYXJkcycpLnJlbW92ZUNsYXNzKCdzaG93bicpLmFkZENsYXNzKCdoaWRkZW4nKVxuICAgICQoJy5hbGFybV9jaGFuZ2VfY2FyZF93cmFwcGVyJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpLmFkZENsYXNzKCdzaG93bicpXG4gICAgXG4gICQoJy5kYXknKS5vbiAnY2xpY2snLCAtPlxuICAgICQoQCkudG9nZ2xlQ2xhc3MgJ2FjdGl2ZSdcbiAgXG4gICQoJy5zYXZpbmdfYnV0dG9uJykub24gJ2NsaWNrJywgLT5cbiAgICAkKCcuYWxhcm1fY2FyZHMnKS5yZW1vdmVDbGFzcygnaGlkZGVuJykuYWRkQ2xhc3MoJ3Nob3duJylcbiAgICAkKCcuYWxhcm1fY2hhbmdlX2NhcmRfd3JhcHBlcicpLnJlbW92ZUNsYXNzKCdzaG93bicpLmFkZENsYXNzKCdoaWRkZW4nKVxuIFxuICAgIGhvdXJzID0gcGFyc2VJbnQgJCgnLmhvdXJzIC52YWx1ZScpLnRleHQoKVxuICAgIG1pbnV0ZXMgPSBwYXJzZUludCAkKCcubWludXRlcyAudmFsdWUnKS50ZXh0KClcbiAgICBmcmVxdWVuY3kgPSBbXVxuICAgICQoJy5kYXknKS5lYWNoIChpbmRleCwgZWxlbWVudCkgLT5cbiAgICAgIGZyZXF1ZW5jeS5wdXNoKGluZGV4KSBpZiAkKGVsZW1lbnQpLmhhc0NsYXNzKCdhY3RpdmUnKVxuXG4gICAgc2V0QWxhcm0od2luZG93LmN1cnJlbnRBbGFybU51bWJlciwgaG91cnMsIG1pbnV0ZXMsIGZyZXF1ZW5jeSlcbiAgXG4gICMjIyMjIyMjIFNldCB0aW1lICMjIyMjIyMjXG4gICQoJy5ob3VycyAudXAnKS5vbiAnY2xpY2snLCAtPlxuICAgIG5ld0hvdXJzID0gY2hhbmdlVGltZSBwYXJzZUludCgkKCcuaG91cnMgLnZhbHVlJykudGV4dCgpKSwgMjMsICdpbmNyZWFzZSdcbiAgICAkKCcuaG91cnMgLnZhbHVlJykudGV4dCBuZXdIb3Vyc1xuICAgIFxuICAkKCcuaG91cnMgLmRvd24nKS5vbiAnY2xpY2snLCAtPlxuICAgIG5ld0hvdXJzID0gY2hhbmdlVGltZSBwYXJzZUludCgkKCcuaG91cnMgLnZhbHVlJykudGV4dCgpKSwgMjMsICdkZWNyZWFzZSdcbiAgICAkKCcuaG91cnMgLnZhbHVlJykudGV4dCBuZXdIb3Vyc1xuICAgIFxuICAkKCcubWludXRlcyAudXAnKS5vbiAnY2xpY2snLCAtPlxuICAgIG5ld01pbnV0ZXMgPSBjaGFuZ2VUaW1lIHBhcnNlSW50KCQoJy5taW51dGVzIC52YWx1ZScpLnRleHQoKSksIDU5LCAnaW5jcmVhc2UnXG4gICAgJCgnLm1pbnV0ZXMgLnZhbHVlJykudGV4dCBuZXdNaW51dGVzXG4gICAgXG4gICQoJy5taW51dGVzIC5kb3duJykub24gJ2NsaWNrJywgLT5cbiAgICBuZXdNaW51dGVzID0gY2hhbmdlVGltZSBwYXJzZUludCgkKCcubWludXRlcyAudmFsdWUnKS50ZXh0KCkpLCA1OSwgJ2RlY3JlYXNlJ1xuICAgICQoJy5taW51dGVzIC52YWx1ZScpLnRleHQgbmV3TWludXRlc1xuICBcbiAgc2V0QWxhcm0oMCwgMTgsIDAsIFswLCAxLCAyLCAzLCA0LCA1LCA2XSlcbiAgc2V0QWxhcm0oMSwgNiwgMCwgWzEsIDIsIDNdKVxuICBzZXRBbGFybSgyLCAxMiwgMCwgWzMsIDQsIDUsIDZdKSJdfQ==
//# sourceURL=coffeescript